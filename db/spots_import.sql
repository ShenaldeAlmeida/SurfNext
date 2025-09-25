
--Reset staging table 

TRUNCATE _spots_stage;

--Upsert into spots 

INSERT INTO spots (
region_id, spot_slug, name, description, lat, lon, level, type, sheltered 
)
SELECT
	r.region_id,
	s.spot_slug,
	s.name,
	s.description, 
	s.lat::NUMERIC(8, 5),
	s.lon::NUMERIC(8, 5),
	s.level,
	s.type,
	s.sheltered::boolean 
FROM _spots_stage s
JOIN regions r ON r.region_slug = s.region_slug
ON CONFLICT(region_id, spot_slug)
DO UPDATE SET
	name 		= excluded.name,
	description = EXCLUDED.description,
	lat         = EXCLUDED.lat,
	lon         = EXCLUDED.lon,
	level       = EXCLUDED.level,
	type        = EXCLUDED.type,
	sheltered   = EXCLUDED.sheltered;
