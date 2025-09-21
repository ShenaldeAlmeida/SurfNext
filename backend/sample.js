// sample.js

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

// --- Spots by Region ---
// Each array contains all spots in that region, with qualifying flagged
export const spots_by_region = {
  "south-sri-lanka": [
    {
      spot_id: 11,
      spot_slug: "weligama-bay",
      name: "Weligama Bay",
      description: "Wide sandy bay with mellow walls.",
      lat: 5.97,
      lon: 80.42,
      level: "B",
      type: "beach",
      sheltered: true,
      qualifying: true,
    },
    {
      spot_id: 12,
      spot_slug: "midigama",
      name: "Midigama",
      description: "Reef setups with friendly walls on small days.",
      lat: 5.95,
      lon: 80.38,
      level: "B",
      type: "reef",
      sheltered: false,
      qualifying: true,
    },
    {
      spot_id: 13,
      spot_slug: "kabalana",
      name: "Kabalana",
      description: "Peak with various takeoff zones.",
      lat: 5.97,
      lon: 80.37,
      level: "I",
      type: "reef",
      sheltered: false,
      qualifying: false,
    },
  ],

  "bali-bukit": [
    {
      spot_id: 21,
      spot_slug: "padang-padang",
      name: "Padang Padang",
      description: "Beautiful reef with beginner inside section.",
      lat: -8.81,
      lon: 115.09,
      level: "B",
      type: "reef",
      sheltered: false,
      qualifying: true,
    },
    {
      spot_id: 22,
      spot_slug: "dreamland",
      name: "Dreamland",
      description: "Friendly beachbreak on Bukit Peninsula.",
      lat: -8.82,
      lon: 115.09,
      level: "B",
      type: "beach",
      sheltered: true,
      qualifying: true,
    },
    {
      spot_id: 23,
      spot_slug: "uluwatu",
      name: "Uluwatu",
      description: "World-class left reef, more advanced.",
      lat: -8.83,
      lon: 115.08,
      level: "A",
      type: "reef",
      sheltered: false,
      qualifying: false,
    },
  ],
};

// --- Regions Array ---
// Convenience: /regions endpoint can just return Object.values(region_summaries)
export const region_data = Object.values(region_summaries);
