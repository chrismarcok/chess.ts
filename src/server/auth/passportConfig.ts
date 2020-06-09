import * as passportLocal from "passport-local";
import * as bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { RED, GREEN, CYAN } from "../../utils/colors";

const LocalStrategy = passportLocal.Strategy;

function getUserByUsername(username: string) {
  console.log(`LOGIN: Attempting to log in user with username: ${username}`);

  return User.findOne({ username: username })
    .exec()
    .then((user) => {
      if (user !== null) {
        return user;
      } else {
        throw new Error(`Error 20000: User not found.`)
        
      }
    })
    .catch((err: Error) => {
      console.log(RED, err.message);
      return null;
    });
}

function getUserById(id: string) {
  return User.findById(id, (err, user) => {
    if (err) throw err;
    if (user) {
      return user;
    } else {
      return null;
    }
  });
}

export default (passport: any) => {
  const authenticateUser = async (username: string, password: string, done: Function) => {
    const user = await getUserByUsername(username);
    if (user === null) {
      return done(null, false, { message: "no user found for that username" });
    }
    try {
      if (await bcrypt.compare(password, (<IUser>user).password)) {
        console.log(GREEN, "LOGIN: SUCCESS: User and password match - Successful login.\n");
        return done(null, user);
      } else {
        console.log(RED, "LOGIN: FAILURE: Password doesnt match.\n");
        return done(null, false, { message: "password did not match" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user: IUser, done: Function) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id: string, done: Function) => {
    const user = await getUserById(id);
    return done(null, user);
  });
  console.log(CYAN, `[INFO] Passport Initialized.`)
}
