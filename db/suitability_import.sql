
--Clear staging table
TRUNCATE _overrides_stage;

--Upsert into suitability 
INSERT INTO suitability_overrides (
  region_id, month, ability, allow_override, reason, notes
)
SELECT
  r.region_id,
  o.month::smallint,
  o.ability,
  o.allow_override::boolean,
  o.reason,
  o.notes
FROM _overrides_stage o
JOIN regions r ON r.region_slug = o.region_slug
ON CONFLICT (region_id, month, ability)
DO UPDATE SET
  allow_override = EXCLUDED.allow_override,
  reason         = EXCLUDED.reason,
  notes          = EXCLUDED.notes;