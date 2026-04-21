UPDATE public.contractor_regions
SET zip_codes = (
  SELECT array_agg(DISTINCT z ORDER BY z)
  FROM unnest(zip_codes || ARRAY[
    '19019','19092','19093','19099','19101','19105','19108','19110','19113',
    '19155','19160','19161','19162','19170','19171','19172','19173','19175',
    '19177','19178','19179','19181','19182','19183','19184','19185','19187',
    '19188','19191','19192','19193','19194','19195','19196','19197','19244','19255'
  ]::text[]) AS z
),
updated_at = now()
WHERE region_name = 'Bucks County & Greater Philly';