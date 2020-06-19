import { ReactRoom, IRoom } from "../../server/models/Room";
import { IRoomAction, IAction } from "./types";
import { ROOM_CREATE, ROOM_DESTROY } from "./constants";

export const roomCreate = (room: ReactRoom): IRoomAction => {
  return {
    type: ROOM_CREATE,
    payload: {
      _id: room._id,
      host: room.host,
      players: room.players,
      decklist: room.decklist,
      started: room.started,
      ended: room.ended,
      expireAt: room.expireAt,
    },
  }
}

export const destroyRoom = (): IAction => {
  return {
    type: ROOM_DESTROY,
  }
}