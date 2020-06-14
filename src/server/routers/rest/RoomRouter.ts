import * as express from "express";
import { checkAuthenticated403, checkAdmin } from "../../auth/checkAuth";
import Room, {IRoom} from "../../models/Room";
import {ReactUser, IUser} from "../../models/User";

const router = express.Router();

/**
 * Get all rooms
 */
router.get("/rooms", checkAdmin, (req, res) => {
  Room.find()
  .then(rooms => {
    res.status(200).send(rooms);
  })
  .catch((err:Error) => {
      console.log(err);
      res.status(400).send({
          message: err.message,
          status: 400,
      });
  });
    
});

/**
 * Create a new room.
 */
router.post("/rooms", checkAuthenticated403, (req, res) => {
  const user:ReactUser = <ReactUser>req.body.user;
  const iUser:any = Object.assign(user, {password: "NULL_PASSWORD"});
  const room = new Room({
    host:iUser,
    players:[iUser],
    decklist:[],
  });
  room.save()
  .then((obj) => {
    console.log(obj);
    res.sendStatus(201);
  })
  .catch((err:Error) => {
    console.log(err);  
    res.status(400).send({
      status: 400,
      message: "This user is already hosting a game.",
    });
  });
});

export default router;