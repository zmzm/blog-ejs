import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model/user';

const mwPassport = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};

export default mwPassport;
