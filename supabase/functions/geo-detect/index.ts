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
    const { zip_code } = await req.json().catch(() => ({}));

    let detectedZip = zip_code || null;
    let city = null;
    let state = null;
    let regionName = null;
    let contractorRegionId = null;
    let rating = null;
    let reviewCount = null;

    // If no zip provided, try IP-based detection
    if (!detectedZip) {
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim() || null;

      if (ip && ip !== "127.0.0.1") {
        try {
          const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
          if (geoRes.ok) {
            const geo = await geoRes.json();
            detectedZip = geo.postal || null;
            city = geo.city || null;
            state = geo.region_code || null;
          }
        } catch {
          // IP detection failed, continue without it
        }
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // If we have a zip, look up contractor region
    if (detectedZip) {
      const { data: regions } = await supabase
        .from("contractor_regions")
        .select("id, region_name, rating, review_count")
        .filter("is_active", "eq", true);

      if (regions) {
        for (const region of regions) {
          const { data: match } = await supabase
            .from("contractor_regions")
            .select("id, region_name, rating, review_count")
            .eq("id", region.id)
            .contains("zip_codes", [detectedZip])
            .maybeSingle();

          if (match) {
            regionName = match.region_name;
            contractorRegionId = match.id;
            rating = match.rating;
            reviewCount = match.review_count;
            break;
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        zip_code: detectedZip,
        city,
        state,
        region_name: regionName,
        contractor_region_id: contractorRegionId,
        rating,
        review_count: reviewCount,
        in_service_area: !!regionName,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Geo-detect error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to detect location" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
