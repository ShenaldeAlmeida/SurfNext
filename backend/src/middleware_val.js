//Middleware function to validate month and ability

export function validateMonth(req, res, next) {
  const month = Number(req.query.month);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Month is not in 1-12" });
  }

  req.validatedMonth = month;
  next();
}

export function validateAbility(req, res, next) {
  const ability = req.query.ability;
  const allowed_abilities = [
    "FIRST_TIME",
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ];
  if (!allowed_abilities.includes(ability)) {
    return res.status(400).json({
      error:
        "ability invalid — must be one of FIRST_TIME, BEGINNER, INTERMEDIATE, ADVANCED",
    });
  }
  req.validatedAbility = ability;
  next();
}

export function validateFormat(req, res, next) {
  const { slug } = req.params;
  const re = /^[a-z0-9-]+$/;
  if (typeof slug !== "string" || !re.test(slug)) {
    return res.status(400).json({ error: "slug must be of /^[a-z0-9-]+$/" });
  }
  req.validatedFormat = slug;
  next();
}
