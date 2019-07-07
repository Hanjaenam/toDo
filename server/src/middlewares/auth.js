export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).end();
};
export const onlyPublic = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  return res.status(400).end();
};
