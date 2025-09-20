-- Staging for spots (matches your CSV headers exactly)
CREATE TABLE IF NOT EXISTS _spots_stage (
  region_slug   text NOT NULL,
  spot_slug     text NOT NULL,
  name          text NOT NULL,
  description   text,
  lat           text,   -- keep as text; cast in upsert
  lon           text,   -- keep as text; cast in upsert
  level         text,   -- B/I/A (validated on upsert into real table)
  type          text,   -- beach/reef/point
  sheltered     text    -- 'true'/'false' as text; cast in upsert
);

-- Staging for seasonality
CREATE TABLE IF NOT EXISTS _seasonality_stage (
  region_slug   text NOT NULL,
  month         text NOT NULL,  -- 1-12 as text; cast in upsert
  swell         text NOT NULL,  -- none/small/medium/large
  windiness     text NOT NULL,  -- calm/moderate/windy
  air_temp_c    text,
  water_temp_c  text,
  wetsuit       text NOT NULL   -- no-wetsuit, wetsuit-2/2, ... per your list
);

-- Staging for overrides
CREATE TABLE IF NOT EXISTS _overrides_stage (
  region_slug    text NOT NULL,
  month          text NOT NULL,
  ability        text NOT NULL,   -- FIRST_TIME/BEGINNER/INTERMEDIATE/ADVANCED
  allow_override text NOT NULL,   -- 'true'/'false'
  reason         text,
  notes          text
);