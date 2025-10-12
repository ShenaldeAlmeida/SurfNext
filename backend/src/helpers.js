export function isEligible(row, ability) {
  if (ability === "FIRST_TIME") {
    return (
      ["small", "medium"].includes(row.swell) && row.q_count_firsttime >= 1
    );
  }

  if (ability === "BEGINNER") {
    return (
      ["small", "medium"].includes(row.swell) &&
      row.q_count_b >= 1 &&
      row.has_beach_any_count >= 1
    );
  }

  if (ability === "INTERMEDIATE") {
    return row.q_count_i >= 1;
  }

  if (ability === "ADVANCED") {
    return ["medium", "large"].includes(row.swell) && row.q_count_a >= 1;
  }

  return false; // fallback if unknown ability
}

export function computeScore(row, ability) {
  let q_count = 0;
  let s_count = 0;

  if (ability === "FIRST_TIME") {
    q_count = row.q_count_firsttime;
    s_count = row.s_count_firsttime;
  } else if (ability === "BEGINNER") {
    q_count = row.q_count_b;
    s_count = row.s_count_b;
  } else if (ability === "INTERMEDIATE") {
    q_count = row.q_count_i;
    s_count = row.s_count_i;
  } else if (ability === "ADVANCED") {
    q_count = row.q_count_a;
    s_count = row.s_count_a;
  }

  // MVP: score is just q_count
  const score = q_count;

  return {
    score,
    q_count,
    s_count,
    explanation: `${q_count} qualifying (${s_count} sheltered)`,
  };
}

export function rank(rows) {
  const sorted = rows.toSorted((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    else if (b.s_count !== a.s_count) return b.s_count - a.s_count;
    else
      return a.region_name
        .toLowerCase()
        .localeCompare(b.region_name.toLowerCase());
  });
  const ranked = sorted.map((val, idx) => {
    let rank = idx + 1;
    let is_top5 = false;
    if (rank <= 5) {
      is_top5 = true;
    }
    val.rank = rank;
    val.is_top5 = is_top5;
    return val;
  });

  return ranked;
}

export function isQualifying(row, ability) {
  if (ability === "FIRST_TIME") {
    return row.level === "B" && row.type === "beach";
  }

  if (ability === "BEGINNER") {
    return row.level === "B";
  }

  if (ability === "INTERMEDIATE") {
    return row.level === "I";
  }

  if (ability === "ADVANCED") {
    return row.level === "A";
  }

  return false;
}

export function hasAnyBeach(spots) {
  return spots.some((s) => s.type === "beach");
}

/**
 * Convert 1..12 to a short month label.
 * Returns empty string if out of range (defensive).
 */
export function monthShort(month) {
  const names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return Number.isInteger(month) && month >= 1 && month <= 12
    ? names[month - 1]
    : "";
}

/**
 * Human label for ability (FIRST_TIME → "First time", etc.).
 * Keeps formatting logic in one place.
 */
export function abilityLabel(ability) {
  switch (ability) {
    case "FIRST_TIME":
      return "first timer";
    case "BEGINNER":
      return "beginner";
    case "INTERMEDIATE":
      return "intermediate";
    case "ADVANCED":
      return "advanced";
    default:
      return ability ?? "";
  }
}

/**
 * Build the user-facing explanation sentence for the detail view.
 * Example: "For a Beginner in Nov, we have 4 qualifying spots (2 sheltered)."
 *
 * - Shows sheltered only when sCount > 0 (keeps it short).
 * - Month uses short label ("Nov"); ability title-cased.
 */
export function buildExplanation({
  region_name,
  month,
  ability,
  qCount,
  sCount,
}) {
  const m = monthShort(month);
  const a = abilityLabel(ability);

  // Base sentence
  let text = `For ${
    ["INTERMEDIATE", "ADVANCED"].includes(ability) ? "an" : "a"
  } ${a} surfer in ${m}, we have ${qCount} qualifying spot${
    qCount === 1 ? "" : "s"
  } in ${region_name}`;

  // Optional sheltered clause
  if (sCount > 0) {
    text += ` (${sCount} sheltered)`;
  }

  return text + ".";
}
