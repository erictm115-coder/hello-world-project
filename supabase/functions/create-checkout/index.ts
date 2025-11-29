import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planType, email } = await req.json();
    
    console.log('Creating checkout session for:', { planType, email });

    // Map plan types to amounts (in cents)
    const priceMap: Record<string, number> = {
      '1month': 1107, // €11.07
      '3months': 1998, // €19.98
      '1year': 4998, // €49.98
    };

    const amount = priceMap[planType];
    if (!amount) {
      throw new Error('Invalid plan type');
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: amount,
            product_data: {
              name: `Deepkeep ${planType === '1month' ? '1 Month' : planType === '3months' ? '3 Months' : '1 Year'} Plan`,
              description: 'Personal growth subscription',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${req.headers.get('origin')}/growth-plan?session_id={CHECKOUT_SESSION_ID}&step=39`,
      cancel_url: `${req.headers.get('origin')}/growth-plan?step=38`,
      metadata: {
        plan_type: planType,
        email: email,
      },
    });

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
