import * as express from "express";
import * as passport from "passport";
import { checkAuthenticated } from "../auth/checkAuth";
import { IUser } from "../models/User";

const router = express.Router();

/**
 * Logs in a user.
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/me',
  failureRedirect: '/',
}));

router.get('/logout', checkAuthenticated, (req, res) => {
  const user: IUser = <IUser>req.user;
  console.log(`${user.username} has been logged out.`);
  req.logout();
  res.redirect("/");
});

export default router;