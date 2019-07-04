export const onlyPrivate = (type, req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).end();
};
