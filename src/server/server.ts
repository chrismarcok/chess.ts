import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as http from "http";
import * as socketio from "socket.io";
import { Message, ReactUser } from "../utils/types";

import { CYAN, RED, YELLOW, MAGENTA } from "../utils/colors";
dotenv.config();

// SERVER INIT
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const connections: {[key: string]: {user: ReactUser}} = {};


// EXPRESS SESSION

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// BODYPARSER

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES

app.use(express.static(path.join(__dirname, "../public")));

const defaultRouter = express.Router();
defaultRouter.get("/connections", (req, res) => {
  res.send(connections);
});
defaultRouter.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});
app.use(defaultRouter);

// SERVE

const port: string | number = process.env.PORT || 3000;
server.listen(port, () =>{
  console.log(CYAN, `[INFO] Server listening on port ${port} in mode ${app.settings.env}.`);
  console.log(YELLOW, `\n******\n[INFO] Visit ( http://localhost:3000 ) to open the app.\n******\n`);
});

// SOCKET IO

io.on("connection", (socket: socketio.Socket) => {
  let currentRoomId: string;

  socket.on("user-joined", (payload: {user: ReactUser, roomId: string}) => {
    console.log(MAGENTA, `[SOCKET.IO] User ${payload.user.username} has connected to room ${payload.roomId}.`);

    connections[socket.id] = payload;
    socket.to(payload.roomId).broadcast.emit("user-joined", payload.user);
  });

  socket.on("create", (roomId) => {
    socket.join(roomId);
    currentRoomId = roomId;
  });

  socket.on("send-message", (payload: {message: Message, roomId: string}) => {
    socket.to(payload.roomId).broadcast.emit("send-message", payload.message);
  });

  socket.on("start-game", (roomId) => {
    socket.to(roomId).broadcast.emit("start-game");
  });


  socket.on("disconnect", () => {
    if (connections[socket.id] !== undefined){
      const username: string = connections[socket.id].user.username;

      console.log(MAGENTA, `[SOCKET.IO] ${username} disconnected.`);
      socket.to(currentRoomId).broadcast.emit("user-disconnected", connections[socket.id].user);
    }
    delete connections[socket.id];
  });
});