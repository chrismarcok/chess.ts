import { ReactRoom } from "../../server/models/Room";
import { IRoomAction, IAction } from "./types";
import { ROOM_CREATE } from "./constants";

export const roomCreate = (room: ReactRoom): IRoomAction => {
  return {
    type: ROOM_CREATE,
    payload: room,
  }
}