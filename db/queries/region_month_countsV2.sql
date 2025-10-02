
CREATE VIEW vw_regions_month_counts AS 
-- region_month_counts.sql
-- One row per region × month, ability-agnostic counts (API decides how to use them)
WITH counts AS (
  SELECT
    spots.region_id,

    -- Beginner (B)
    SUM(CASE WHEN spots.level = 'B' THEN 1 ELSE 0 END)::int                                         AS q_count_b,
    SUM(CASE WHEN spots.level = 'B' AND spots.sheltered = TRUE THEN 1 ELSE 0 END)::int              AS s_count_b,
    COUNT(DISTINCT CASE WHEN spots.level = 'B' THEN spots.type END)::int                            AS variety_b,

    -- Intermediate (I)
    SUM(CASE WHEN spots.level = 'I' THEN 1 ELSE 0 END)::int                                         AS q_count_i,
    SUM(CASE WHEN spots.level = 'I' AND spots.sheltered = TRUE THEN 1 ELSE 0 END)::int              AS s_count_i,
    COUNT(DISTINCT CASE WHEN spots.level = 'I' THEN spots.type END)::int                            AS variety_i,

    -- Advanced (A)
    SUM(CASE WHEN spots.level = 'A' THEN 1 ELSE 0 END)::int                                         AS q_count_a,
    SUM(CASE WHEN spots.level = 'A' AND spots.sheltered = TRUE THEN 1 ELSE 0 END)::int              AS s_count_a,
    COUNT(DISTINCT CASE WHEN spots.level = 'A' THEN spots.type END)::int                            AS variety_a,

    -- FIRST_TIME (Beginner + beach)
    SUM(CASE WHEN spots.level = 'B' AND spots.type = 'beach' THEN 1 ELSE 0 END)::int                AS q_count_firsttime,
    SUM(CASE WHEN spots.level = 'B' AND spots.type = 'beach' AND spots.sheltered = TRUE
             THEN 1 ELSE 0 END)::int                                                                AS s_count_firsttime,

    -- Region-wide beach info
    SUM(CASE WHEN spots.type = 'beach' THEN 1 ELSE 0 END)::int                                      AS has_beach_any_count,
    SUM(CASE WHEN spots.level = 'B' AND spots.type = 'beach' THEN 1 ELSE 0 END)::int                AS has_beginner_beach_count

  FROM spots
  GROUP BY spots.region_id
)

SELECT
  -- Region identity
  r.region_id,
  r.region_slug,
  r.region_name,
  r.country,
  r.lat,
  r.lon,

  -- Seasonality for the month
  s.month,
  s.swell,
  s.windiness,
  s.air_temp_c,
  s.water_temp_c,
  s.wetsuit,

  -- Counts (null→0 to keep regions without spots)
  COALESCE(c.q_count_b, 0)               AS q_count_b,
  COALESCE(c.s_count_b, 0)               AS s_count_b,
  COALESCE(c.variety_b, 0)               AS variety_b,

  COALESCE(c.q_count_i, 0)               AS q_count_i,
  COALESCE(c.s_count_i, 0)               AS s_count_i,
  COALESCE(c.variety_i, 0)               AS variety_i,

  COALESCE(c.q_count_a, 0)               AS q_count_a,
  COALESCE(c.s_count_a, 0)               AS s_count_a,
  COALESCE(c.variety_a, 0)               AS variety_a,

  COALESCE(c.q_count_firsttime, 0)       AS q_count_firsttime,
  COALESCE(c.s_count_firsttime, 0)       AS s_count_firsttime,

  COALESCE(c.has_beach_any_count, 0)     AS has_beach_any_count,
  COALESCE(c.has_beginner_beach_count, 0) AS has_beginner_beach_count

FROM seasonality AS s
JOIN regions     AS r ON r.region_id = s.region_id
LEFT JOIN counts AS c ON c.region_id = s.region_id;
