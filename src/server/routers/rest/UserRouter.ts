import * as express from "express";
import * as bcrypt from "bcryptjs";
import User, { IUser } from "../../models/User";
import { getRandomString } from "../../../utils/utils";
import { checkAuthenticated } from "../../auth/checkAuth";

const router = express.Router();

router.get(`/me`, checkAuthenticated, (req, res) => {
  const user: IUser = <IUser>req.user;
  user.password = undefined;
  res.send(user);
})

/**
 * Finds all users.
 */
router.get(`/users`, (req, res, next) => {
  User.find()
    .then((result) => {
      result.forEach(r => r.password = undefined);
      res.status(200).send(result);
    })
    .catch((e: any) => {
      const errMsg = `Error 10000: ${e}`
      console.log(errMsg);
      res.status(200).send({
        status: 200,
        message: errMsg,
      });
    });
});

/**
 * Register a new User.
 */
router.post(`/users`, (req, res) => {
  //server-side check that a user with this username or email doesnt already exist
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((user: IUser) => {
      if (user) {
        throw new Error(
          `Error 10001: user ${req.body.username} or email ${req.body.email} already exists.`
        );
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          avatarURL: `https://api.adorable.io/avatars/200/${getRandomString()}`,
          mmr: 1000,
          bio: "This user has no bio.",
          dateCreated: new Date(),
          deleted: false,
          isAdmin: false,
        });

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
                console.log(
                  `${user.username} is registered and can now login.`
                );
                res.sendStatus(201);
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
