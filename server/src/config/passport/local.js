import User from 'models/User';
import { Strategy as LocalStrategy } from 'passport-local';

const strategyLogInCB = async (req, email, password, done) => {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return done(null, false, req.flash('message', '등록된 계정이 없습니다.'));
    }
    if (!user.authenticate(password)) {
      return done(
        null,
        false,
        req.flash('message', '비밀번호가 일치하지 않습니다.'),
      );
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategyRegisterCB = async (req, email, password, done) => {
  const {
    body: { confirmPassword },
  } = req;
  try {
    if (!confirmPassword) {
      return done(
        null,
        false,
        req.flash('message', '확인 비밀번호까지 입력해주세요.'),
      );
    }
    if (password !== confirmPassword) {
      return done(
        null,
        false,
        req.flash('message', '두 비밀빈호가 일치하지 않습니다.'),
      );
    }
    const user = await User.findByEmail(email);
    if (user) {
      return done(null, false, req.flash('message', '이미 등록된 계정입니다.'));
    }
    const newUser = await User.create({ email, password });
    return done(null, newUser);
  } catch (err) {
    if (err.name.includes('Validation')) {
      if (err.message.includes('email')) {
        return done(
          null,
          false,
          req.flash('message', '올바른 이메일을 입력해주세요'),
        );
      }
      // if (err.message.includes('password')) {
      //   return done(null, false, req.flash('message', '비밀번호 형식을 맞춰주세요'))
      // }
    }
    return done(err);
  }
};

export const logIn = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  strategyLogInCB,
);

export const register = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  strategyRegisterCB,
);
