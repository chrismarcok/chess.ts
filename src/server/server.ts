import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as session from "express-session";
import * as http from "http";
import * as socketio from "socket.io";

import initializePassport from "./auth/passportConfig";
import UserRouter from "./routers/rest/UserRouter";
import DeckRouter from "./routers/rest/DeckRouter";
import RoomRouter from "./routers/rest/RoomRouter";
import LoginRouter from "./routers/LoginRouter";
import { CYAN, RED, YELLOW, MAGENTA } from "../utils/colors";
import { checkAuthenticated } from "./auth/checkAuth";
import { ReactUser } from "./models/User";
import { ReactRoom } from "./models/Room";
import { Message } from "../utils/types";
dotenv.config();

// SERVER INIT
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const connections: {[key: string]: {user: ReactUser, room: ReactRoom}} = {};

// MONGOOSE

(<any>mongoose).Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(CYAN, `[INFO] MongoDB Connection Established.\n`))
  .catch((err: Error) => console.log(RED, `[ERROR] Mongo error: ${err.message}\n`));


// EXPRESS SESSION

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// PASSPORT

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// BODYPARSER

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES

app.use(express.static(path.join(__dirname, "../public")));
app.use(`/`, LoginRouter);
app.use(`/api`, UserRouter);
app.use(`/api`, RoomRouter);
app.use(`/api`, DeckRouter);

const defaultRouter = express.Router();
defaultRouter.get("/connections", (req, res) => {
  res.send(connections);
});
defaultRouter.get(["/activate/*", "/rooms/*"], checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'));
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

  socket.on("user-joined", (payload: {user: ReactUser, room: ReactRoom}) => {
    console.log(MAGENTA, `[SOCKET.IO] User ${payload.user.username} has connected to room ${payload.room._id}.`);
    connections[socket.id] = payload;
    socket.to(payload.room._id).broadcast.emit("user-joined", payload.user);
  });

  socket.on("create", (roomId) => {
    socket.join(roomId);
    currentRoomId = roomId;
  });

  socket.on("send-message", (payload: {message: Message, room: ReactRoom}) => {
    socket.to(payload.room._id).broadcast.emit("send-message", payload.message);
  });

  socket.on("disconnect", () => {
    if (connections[socket.id] !== undefined){
      console.log(MAGENTA, `[SOCKET.IO] ${connections[socket.id].user} disconnected.`);
      socket.to(currentRoomId).broadcast.emit("user-disconnected", connections[socket.id].user);
    }
    delete connections[socket.id];
  });
});