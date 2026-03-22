-- Create contractor_regions table
CREATE TABLE public.contractor_regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region_name TEXT NOT NULL,
  contractor_name TEXT,
  contractor_email TEXT,
  webhook_url TEXT,
  zip_codes TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 4.8,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  zip_code TEXT NOT NULL,
  city TEXT,
  state TEXT,
  region_name TEXT,
  contractor_region_id UUID REFERENCES public.contractor_regions(id),
  timeline TEXT,
  concern TEXT,
  open_to_visit TEXT,
  intent_level TEXT DEFAULT 'unknown',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  ip_address TEXT,
  is_in_service_area BOOLEAN DEFAULT false,
  webhook_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create waitlist table for out-of-area leads
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contractor_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- contractor_regions: publicly readable (needed for frontend personalization)
CREATE POLICY "Anyone can read active contractor regions"
  ON public.contractor_regions FOR SELECT
  USING (is_active = true);

-- leads: insert only from anon (form submissions), no public reads
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- waitlist: insert only from anon
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (true);

-- Timestamp trigger for contractor_regions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contractor_regions_updated_at
  BEFORE UPDATE ON public.contractor_regions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for zip code lookups
CREATE INDEX idx_contractor_regions_zip_codes ON public.contractor_regions USING GIN(zip_codes);