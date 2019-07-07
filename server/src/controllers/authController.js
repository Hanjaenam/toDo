import passport from 'passport';

export const logIn = passport.authenticate('localLogIn', {
  successRedirect: '/me',
  failureRedirect: '/auth/failure',
  failureFlash: true,
  successFlash: true,
});

export const register = passport.authenticate('localRegister', {
  successRedirect: '/me',
  failureRedirect: '/auth/failure',
  failureFlash: true,
  successFlash: true,
});

export const failure = (req, res) => {
  return res.status(400).json({ message: req.flash('message') });
};
