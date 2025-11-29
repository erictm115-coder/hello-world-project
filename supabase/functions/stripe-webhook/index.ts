import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('Missing stripe-signature header');
      return new Response(
        JSON.stringify({ error: 'Missing stripe-signature header' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Webhook secret not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);

    console.log('Webhook event received:', event.type);

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;
      
      if (!metadata) {
        throw new Error('No metadata found in session');
      }

      const { plan_type, email } = metadata;
      
      console.log('Processing completed checkout:', { plan_type, email });

      // Calculate end date based on plan type
      const now = new Date();
      let endDate = new Date(now);
      
      switch (plan_type) {
        case '1month':
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case '3months':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case '1year':
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          throw new Error('Invalid plan type');
      }

      // Store subscription in database (without user_id for now)
      // We'll update it with user_id after the user creates their account
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          email: email,
          plan_type: plan_type,
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          status: 'active',
          user_id: '00000000-0000-0000-0000-000000000000', // Temporary placeholder
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting subscription:', error);
        throw error;
      }

      console.log('Subscription created:', data);

      return new Response(
        JSON.stringify({ received: true, subscription: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle payment_intent.succeeded for embedded payments
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata;
      
      if (!metadata) {
        throw new Error('No metadata found in payment intent');
      }

      const { plan_type, email } = metadata;
      
      console.log('Processing successful payment:', { plan_type, email });

      // Calculate end date based on plan type
      const now = new Date();
      let endDate = new Date(now);
      
      switch (plan_type) {
        case '1month':
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case '3months':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case '1year':
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          throw new Error('Invalid plan type');
      }

      // Store subscription in database
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          email: email,
          plan_type: plan_type,
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          status: 'active',
          user_id: '00000000-0000-0000-0000-000000000000', // Temporary placeholder
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting subscription:', error);
        throw error;
      }

      console.log('Subscription created from payment intent:', data);

      return new Response(
        JSON.stringify({ received: true, subscription: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
