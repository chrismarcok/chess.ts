import * as express from "express";
import * as passport from "passport";
import { checkAuthenticated } from "../auth/checkAuth";
import { IUser, ReactUser } from "../models/User";

const router = express.Router();

/**
 * Logs in a user.
 */
router.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info){
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      res.sendStatus(400);
      return;
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      res.status(200).send({
        user: user
      });
      return;
    });
  })(req, res, next);
});

router.get('/logout', checkAuthenticated, (req, res) => {
  const user: IUser = <IUser>req.user;
  console.log(`${user.username} has been logged out.`);
  req.logout();
  res.redirect("/");
});

export default router;