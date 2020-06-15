import { IAction } from "../actions/types";
import { ROOM_CREATE } from "../actions/constants";
import { ReactRoom } from "../../server/models/Room";

export const nullRoom: ReactRoom = {
  _id: null,
  host: null,
  players: [],
  decklist: [],
  started: null,
  ended: null,
};

export default (state = nullRoom, action: IAction): ReactRoom => {
  switch (action.type) {
    case ROOM_CREATE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
