WITH counts AS (
	SELECT region_id, 
	sum(CASE WHEN level = 'B' THEN 1 ELSE 0 END) AS q_count,
	sum(CASE WHEN (level = 'B' AND (sheltered = TRUE)) THEN 1 ELSE 0 END) AS s_count,
	sum(CASE WHEN type = 'beach' THEN 1 ELSE 0 END) AS has_beach,
	sum(CASE WHEN level = 'B' AND type = 'beach' THEN 1 ELSE 0 end) AS has_beginner_beach
	FROM  spots 
	GROUP BY region_id
	)

SELECT
r.region_id, s.swell, c.q_count, c.s_count, c.has_beach, c.has_beginner_beach
FROM seasonality s
JOIN regions r ON r.region_id = s.region_id
LEFT JOIN counts c ON c.region_id = s.region_id 
WHERE s.month = 12
