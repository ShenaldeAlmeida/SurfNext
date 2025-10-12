// --- Region Summaries ---
// These mirror what /regions returns, but stored by slug
export const region_summaries = {
  "south-sri-lanka": {
    region_id: 1,
    region_slug: "south-sri-lanka",
    region_name: "South Sri Lanka",
    country: "Sri Lanka",
    lat: 5.94,
    lon: 80.46,
    rank: 1,
    is_top5: true,
    score: 4,
    q_count: 4,
    s_count: 1,
    has_beach: true,
    windiness: "moderate",
    wetsuit: "no-wetsuit",
    air_temp_c: 30,
    water_temp_c: 28,
    explanation:
      "Nov • Beginner: 4 qualifying (1 sheltered) • wind: moderate • wetsuit: no-wetsuit",
  },
  "bali-bukit": {
    region_id: 2,
    region_slug: "bali-bukit",
    region_name: "Bali — Bukit Peninsula",
    country: "Indonesia",
    lat: -8.83,
    lon: 115.09,
    rank: 2,
    is_top5: true,
    score: 3,
    q_count: 3,
    s_count: 0,
    has_beach: true,
    windiness: "calm",
    wetsuit: "no-wetsuit",
    air_temp_c: 31,
    water_temp_c: 28,
    explanation:
      "Nov • Beginner: 3 qualifying (0 sheltered) • wind: calm • wetsuit: no-wetsuit",
  },
};

// --- Regions Array ---
// Convenience: /regions endpoint can just return Object.values(region_summaries)
export const region_data = Object.values(region_summaries);
