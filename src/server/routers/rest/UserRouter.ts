import * as express from "express";
import * as bcrypt from "bcryptjs";
import User, { IUser } from "../../models/User";
import { getRandomString, sendVerificationEmail, createNewUser } from "../../../utils/utils";
import { checkAuthenticated, checkAuthenticated403 } from "../../auth/checkAuth";

const router = express.Router();

/**
 * Get the user you are logged in as.
 */
router.get(`/me`, checkAuthenticated403, (req, res) => {
  const user: IUser = <IUser>req.user;
  user.password = undefined;
  res.send(user);
});

/**
 * Finds all users, or a single user if given a specified query param.
 * @QueryParam username: Find the user with this username.
 * @QueryParam email: Find the user with this email.
 */
router.get(`/users`, (req, res, next) => {
  const qp = {
    username: req.query.username,
    email: req.query.email,
  };

  if (!qp.username && !qp.email) {
    User.find()
      .then((result) => {
        result.forEach((r) => (r.password = undefined));
        res.status(200).send(result);
      })
      .catch((e: any) => {
        const errMsg = `Error 10000: ${e}`;
        console.log(errMsg);
        res.status(200).send({
          status: 200,
          message: errMsg,
        });
      });
  } else {
    User.findOne({
      $or: [
        { username: String(qp.username ? qp.username : "") },
        { email: String(qp.email ? qp.email : "") },
      ],
    })
      .then((result) => {
        if (result) {
          result.password = undefined;
          res.status(200).send(result);
        } else {
          throw new Error("No such user exists.");
        }
      })
      .catch((e: Error) => {
        const errMsg = `Error 10002: ${e.message}`;
        console.log(errMsg);
        res.status(200).send({
          status: 200,
          message: errMsg,
        });
      });
  }
});

/**
 * POST: Create/Register a new User.
 */
router.post(`/users`, (req, res) => {
  //server-side check that a user with this username or email doesnt already exist

  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    req.body.password.length <= 5
  ) {
    res.status(400).send({
      status: 400,
      message: "Invalid registration credentials.",
    });
    return;
  }

  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((user: IUser) => {
      if (user) {
        throw new Error(
          `Error 10001: user ${req.body.username} or email ${req.body.email} already exists.`
        );
      } else {
        const newUser: IUser = createNewUser(req.body.username, req.body.password, req.body.email);

        //Make the salted password and save it to DB
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user: IUser) => {
                // SUCCESS
                console.log(
                  `${user.username} is registered and can now login.`
                );
                sendVerificationEmail(user, (success: boolean) => {
                  if (success){
                    res.sendStatus(201);
                  } else {
                    throw new Error("Error 10003: Could not send verificaiton email.");
                  }
                });
              })
              .catch((err: any) => {
                console.log(err);
                res.status(400).send({
                  status: 400,
                  message: err,
                });
                return;
              });
          });
        });
      }
    })
    .catch((err: Error) => {
      console.log(err.message);
      res.status(500).send({
        status: 500,
        message: err.message,
      });
    });
});

export default router;
