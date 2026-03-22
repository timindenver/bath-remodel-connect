import { createContext, useContext, ReactNode } from "react";
import { useGeoDetection, GeoData } from "@/hooks/useGeoDetection";
import { useUtmParams, UtmParams } from "@/hooks/useUtmParams";

interface GeoContextValue {
  geo: GeoData;
  geoLoading: boolean;
  lookupByZip: (zip: string) => Promise<void>;
  utm: UtmParams;
}

const GeoContext = createContext<GeoContextValue | null>(null);

export function GeoProvider({ children }: { children: ReactNode }) {
  const { geo, loading, lookupByZip } = useGeoDetection();
  const utm = useUtmParams();

  return (
    <GeoContext.Provider value={{ geo, geoLoading: loading, lookupByZip, utm }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  const ctx = useContext(GeoContext);
  if (!ctx) throw new Error("useGeo must be used within GeoProvider");
  return ctx;
}
