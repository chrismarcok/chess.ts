import * as express from "express";
import { checkAuthenticated403, checkAdmin } from "../../auth/checkAuth";
import Room, {IRoom} from "../../models/Room";
import {ReactUser, IUser} from "../../models/User";
import { checkHexSanity } from "../../../utils/utils";

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
 * Get room with id.
 */
router.get("/rooms/:id", checkAuthenticated403, (req, res) => {
  const id: string = req.params.id;

  if (!checkHexSanity(id)){
    res.status(400).send({
      message: "Error 11001: Improperly formatted room id.",
      status: 400,
    });
    return;
  }

  Room.findById(id)
  .then(room => {
    if (room){
      res.status(200).send(room);
    } else {
      throw new Error("Error 11003: Room with that ID does not exist.")
    }
    
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
    started: false,
    ended: false,
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
      message: "Error 11002: This user is already hosting a game.",
    });
  });
});

export default router;