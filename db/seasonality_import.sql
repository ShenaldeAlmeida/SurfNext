--Clear table 
TRUNCATE _seasonality_stage;

--Upsert seasonality CSV
INSERT INTO seasonality (
region_id, month, swell, windiness, air_temp_c, water_temp_c, wetsuit)
SELECT 
	r.region_id,
	s.month::SMALLINT,
	s.swell,
	s.windiness,
	NULLIF(s.air_temp_c, '')::numeric(4,1),
  	NULLIF(s.water_temp_c, '')::numeric(4,1),
  	s.wetsuit
FROM _seasonality_stage s 
JOIN regions r ON r.region_slug = s.region_slug
ON CONFLICT (region_id, month)
DO UPDATE SET
	swell 		 = excluded.swell 
	windiness 	 = excluded.windiness 
 	windiness    = EXCLUDED.windiness,
	air_temp_c   = EXCLUDED.air_temp_c,
  	water_temp_c = EXCLUDED.water_temp_c,
  	wetsuit      = EXCLUDED.wetsuit;