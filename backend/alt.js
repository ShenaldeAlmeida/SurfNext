function isEligible(row, ability) {
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

function rank(row) {
  const sorted = row.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    else return b.s_count - a.s_count;
  });
  const ranked = sorted
    .map((val, idx) => (val.rank = idx + 1))
    .map((val) => {
      if (val.rank <= 5) {
        val.top5 = true;
      }
    });
  return ranked;
}
const x = computeScore({ swell: "small", q_count_firsttime: 2 }, "FIRST_TIME");
console.log(x);
