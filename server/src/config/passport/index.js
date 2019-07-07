import User from 'models/User';
import passport from 'passport';
import { logIn as localLogIn, register as localRegister } from './local';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use('localLogIn', localLogIn);
  passport.use('localRegister', localRegister);
  console.log('complete setting passport');
};
