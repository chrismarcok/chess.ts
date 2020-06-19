import { IAction } from "../actions/types";
import { ROOM_CREATE, ROOM_DESTROY } from "../actions/constants";
import { ReactRoom } from "../../server/models/Room";

export const nullRoom: ReactRoom = {
  _id: null,
  host: null,
  players: [],
  decklist: [],
  started: null,
  ended: null,
  expireAt: null,
};

export default (state = nullRoom, action: IAction): ReactRoom => {
  switch (action.type) {
    case ROOM_CREATE: {
      return action.payload;
    }
    case ROOM_DESTROY: {
      return nullRoom;
    }
    default: {
      return state;
    }
  }
};
