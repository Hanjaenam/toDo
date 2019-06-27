import passport from 'passport';

export const logIn = passport.authenticate('localLogIn', {
  successRedirect: '/auth/getUser',
  failureRedirect: '/auth/failurePassport',
  failureFlash: true,
  successFlash: true,
});

export const register = passport.authenticate('localRegister', {
  successRedirect: '/auth/getUser',
  failureRedirect: '/auth/failurePassport',
  failureFlash: true,
  successFlash: true,
});

export const getUser = (req, res) => {
  if (req.user) {
    const { hash, salt, ...rest } = req.user._doc;
    return res.json(rest);
  }
  return res.status(204).end();
};

export const failurePassport = (req, res) => {
  return res.status(400).json({ message: req.flash('message') });
};
