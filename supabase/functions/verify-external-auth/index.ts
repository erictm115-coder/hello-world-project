import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, email } = await req.json();
    const apiKey = req.headers.get('x-api-key');
    const expectedApiKey = Deno.env.get('EXTERNAL_API_KEY');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let userId: string | null = null;
    let userEmail: string | null = null;

    // Method 1: Token-based authentication (for same-project access)
    if (token) {
      console.log("Verifying token...");
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        console.error("Auth verification failed:", authError);
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: "Invalid or expired token" 
          }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log("Token verified for user:", user.id);
      userId = user.id;
      userEmail = user.email ?? null;
    }
    // Method 2: Email-based authentication (for cross-project access)
    else if (email) {
      console.log("Verifying email with API key...");
      
      // Verify API key
      if (!apiKey || apiKey !== expectedApiKey) {
        console.error("Invalid or missing API key");
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: "Invalid or missing API key" 
          }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log("API key verified, checking email:", email);
      userEmail = email;
    }
    // Neither token nor email provided
    else {
      console.error("No token or email provided");
      return new Response(
        JSON.stringify({ error: "Token or email is required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user has active subscription (by user_id OR email)
    let query = supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString());

    // Add filter based on what we have
    if (userId) {
      query = query.or(`user_id.eq.${userId},email.eq.${userEmail}`);
    } else {
      query = query.eq('email', userEmail);
    }

    const { data: subscriptions, error: subError } = await query;

    if (subError) {
      console.error("Error checking subscription:", subError);
    }

    const subscription = subscriptions && subscriptions.length > 0 ? subscriptions[0] : null;

    console.log("Subscription found:", subscription ? 'Yes' : 'No');

    return new Response(
      JSON.stringify({
        valid: true,
        user: userId ? {
          id: userId,
          email: userEmail,
        } : null,
        subscription: subscription ? {
          plan_type: subscription.plan_type,
          status: subscription.status,
          end_date: subscription.end_date,
        } : null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error("Error in verify-external-auth function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});