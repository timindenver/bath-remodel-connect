import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { name, phone, zip_code } = body;
    if (!name || !phone || !zip_code) {
      return new Response(
        JSON.stringify({ error: "Name, phone, and zip code are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Determine intent level from open_to_visit answer
    let intentLevel = "unknown";
    if (body.open_to_visit === "Yes") intentLevel = "high";
    else if (body.open_to_visit === "Maybe") intentLevel = "medium";
    else if (body.open_to_visit === "No") intentLevel = "low";

    // Look up contractor region by zip
    let contractorRegionId = body.contractor_region_id || null;
    let regionName = body.region_name || null;
    let inServiceArea = body.in_service_area || false;
    let webhookUrl = null;

    if (!contractorRegionId && zip_code) {
      const { data: regions } = await supabase
        .from("contractor_regions")
        .select("id, region_name, webhook_url, zip_codes")
        .eq("is_active", true);

      if (regions) {
        for (const region of regions) {
          if (region.zip_codes?.includes(zip_code)) {
            contractorRegionId = region.id;
            regionName = region.region_name;
            webhookUrl = region.webhook_url;
            inServiceArea = true;
            break;
          }
        }
      }
    } else if (contractorRegionId) {
      const { data: region } = await supabase
        .from("contractor_regions")
        .select("webhook_url")
        .eq("id", contractorRegionId)
        .maybeSingle();
      webhookUrl = region?.webhook_url || null;
    }

    // Get IP for logging
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || null;

    // Insert lead
    const leadData = {
      name,
      phone,
      email: body.email || null,
      zip_code,
      city: body.city || null,
      state: body.state || null,
      region_name: regionName,
      contractor_region_id: contractorRegionId,
      timeline: body.timeline || null,
      concern: body.concern || null,
      open_to_visit: body.open_to_visit || null,
      intent_level: intentLevel,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      utm_term: body.utm_term || null,
      ip_address: ip,
      is_in_service_area: inServiceArea,
      webhook_sent: false,
    };

    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert(leadData)
      .select()
      .single();

    if (insertError) {
      console.error("Lead insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send to webhook if available and intent is not low
    let webhookSent = false;
    if (webhookUrl && intentLevel !== "low") {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_id: lead.id,
            ...leadData,
            submitted_at: lead.created_at,
          }),
        });
        webhookSent = webhookRes.ok;

        if (webhookSent) {
          await supabase
            .from("leads")
            .update({ webhook_sent: true })
            .eq("id", lead.id);
        }
      } catch (e) {
        console.error("Webhook send error:", e);
      }
    }

    // Send to Airtable
    let airtableSent = false;
    const airtablePat = Deno.env.get("AIRTABLE_PAT");
    const airtableBaseId = Deno.env.get("AIRTABLE_BASE_ID");
    const airtableTable = Deno.env.get("AIRTABLE_TABLE_NAME");

    console.log("Airtable config:", { baseId: airtableBaseId, table: airtableTable, hasPat: !!airtablePat, patLength: airtablePat?.length });
    if (airtablePat && airtableBaseId && airtableTable) {
      try {
        const airtableRes = await fetch(
          `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTable)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${airtablePat}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: {
                Name: leadData.name,
                Phone: leadData.phone,
                Email: leadData.email || "",
                ZipCode: leadData.zip_code,
                City: leadData.city || "",
                State: leadData.state || "",
                "Region Name": leadData.region_name || "",
                Timeline: leadData.timeline || "",
                Concern: leadData.concern || "",
                "Open to Visit": leadData.open_to_visit || "",
                "Intent Level": intentLevel,
                "In Service Area": inServiceArea,
                "UTM Source": leadData.utm_source || "",
                "UTM Medium": leadData.utm_medium || "",
                "UTM Campaign": leadData.utm_campaign || "",
                "UTM Content": leadData.utm_content || "",
                "UTM Term": leadData.utm_term || "",
                "IP Address": leadData.ip_address || "",
                // SubmittedAt is a computed field in Airtable, no need to send it
              },
            }),
          }
        );
        airtableSent = airtableRes.ok;
        if (!airtableRes.ok) {
          const errBody = await airtableRes.text();
          console.error("Airtable error:", airtableRes.status, errBody);
        }
      } catch (e) {
        console.error("Airtable send error:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        lead_id: lead.id,
        in_service_area: inServiceArea,
        intent_level: intentLevel,
        webhook_sent: webhookSent,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Submit lead error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
