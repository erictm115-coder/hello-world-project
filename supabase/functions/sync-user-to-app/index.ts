import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SyncUserRequest {
  email: string;
  tempPassword: string;
  stripeCustomerId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[SYNC-USER] Function started");
    
    const { email, tempPassword, stripeCustomerId }: SyncUserRequest = await req.json();
    
    if (!email || !tempPassword) {
      throw new Error("Email and tempPassword are required");
    }

    console.log("[SYNC-USER] Syncing user:", { email, hasCustomerId: !!stripeCustomerId });

    // Get the main app URL from environment variables
    const mainAppUrl = Deno.env.get("MAIN_APP_URL");
    
    if (!mainAppUrl) {
      throw new Error("MAIN_APP_URL environment variable not set");
    }

    // Send POST request to main app's API
    const response = await fetch(`${mainAppUrl}/functions/v1/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sync-secret": "sk_sync_a8f3j2k4m9x",
      },
      body: JSON.stringify({
        email,
        tempPassword,
        stripeCustomerId: stripeCustomerId || null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SYNC-USER] Main app API error:", errorText);
      throw new Error(`Main app API responded with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("[SYNC-USER] Successfully synced user:", result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "User synced successfully",
        result 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("[SYNC-USER] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to sync user to main app" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
