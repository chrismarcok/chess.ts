import * as express from "express";
import { checkAuthenticated403, checkAdmin } from "../../auth/checkAuth";
import Room, {IRoom} from "../../models/Room";
import {ReactUser, IUser} from "../../models/User";
import { checkHexSanity } from "../../../utils/utils";
import { Mongoose, Types } from "mongoose";
import { RED } from "../../../utils/colors";

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
 * Find room hosted by this user.
 */
router.get("/rooms/mine", checkAuthenticated403, (req, res) => {
  Room.findOne({'host.username': (<IUser>req.user).username})
  .then(room => {
    if (room){
      res.status(200).send(room);
    } else {
      throw new Error("INFO 11005: This user does not have a room.");
    }
  })
  .catch((err:Error) => {
      console.log(err);
      res.status(400).send({
        message: err.message,
        status: 400,
      })
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
  const user:IUser = <IUser>req.user;
  const room = new Room({
    host:user,
    players:[],
    decklist:[],
    started: false,
    ended: false,
  });
  room.save()
  .then((r) => {
    res.status(200).send(r);
  })
  .catch((err:Error) => {
    console.log(err);  
    res.status(400).send({
      status: 400,
      message: "Error 11002: This user is already hosting a game.",
    });
  });
});

/**
 * Start a game.
 */
router.post("/rooms/:id/start", checkAuthenticated403, (req, res) => {
  const user:IUser = <IUser>req.user;
  const id:string = req.params.id;
  Room.findById(id)
  .then(room => {
    if (room && String(room.host._id) === String(user._id)){
      return Room.findByIdAndUpdate({_id: id},
        {started: true, decklist: req.body}, {new: true})
    } else {
      throw new Error(`Error 11020: No room with id ${id}`);
    }
  })
  .then((r) => {
    res.status(200).send(r);
  })
  .catch((err:Error) => {
      console.log(err.message);
      res.status(400).send({
        status: 400,
        message: err.message,
      })
  });
});

export default router;