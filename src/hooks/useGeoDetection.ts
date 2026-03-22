import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GeoData {
  zip_code: string | null;
  city: string | null;
  state: string | null;
  region_name: string | null;
  contractor_region_id: string | null;
  rating: number | null;
  review_count: number | null;
  in_service_area: boolean;
}

const DEFAULT_GEO: GeoData = {
  zip_code: null,
  city: null,
  state: null,
  region_name: null,
  contractor_region_id: null,
  rating: null,
  review_count: null,
  in_service_area: false,
};

export function useGeoDetection() {
  const [geo, setGeo] = useState<GeoData>(DEFAULT_GEO);
  const [loading, setLoading] = useState(true);

  // Auto-detect on mount via IP
  useEffect(() => {
    const detect = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("geo-detect", {
          body: {},
        });
        if (!error && data) {
          setGeo(data as GeoData);
        }
      } catch {
        // Silent fail — will use fallback
      } finally {
        setLoading(false);
      }
    };
    detect();
  }, []);

  // Manual lookup by zip code
  const lookupByZip = useCallback(async (zipCode: string) => {
    if (zipCode.length < 5) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("geo-detect", {
        body: { zip_code: zipCode },
      });
      if (!error && data) {
        setGeo(data as GeoData);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  return { geo, loading, lookupByZip };
}
