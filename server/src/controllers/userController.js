import passport from 'passport';

export const logIn = passport.authenticate('localLogIn', {
  successRedirect: '/user/getInfo',
  failureRedirect: '/user/failurePassport',
  failureFlash: true,
  successFlash: true,
});

export const register = passport.authenticate('localRegister', {
  successRedirect: '/user/getInfo',
  failureRedirect: '/user/failurePassport',
  failureFlash: true,
  successFlash: true,
});

export const getInfo = async (req, res) => {
  if (req.user) {
    const { hash, salt, ...userInfo } = req.user._doc;
    return res.json(userInfo);
    // try {
    //   const {
    //     _doc: { hash, salt, ...user },
    //   } = await req.user.populate('project').execPopulate();
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).end();
    // }
  }
  return res.status(204).end();
};

export const failurePassport = (req, res) => {
  return res.status(400).json({ message: req.flash('message') });
};
