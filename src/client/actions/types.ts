import { ReactUser } from "../../server/models/User";
import { ReactRoom } from "../../server/models/Room";

export interface ReduxState {
  user: ReactUser;
  room: ReactRoom;
}

export interface IAction {
  payload?: any;
  type: string;
}

export interface IUserAction extends IAction {
  payload: ReactUser;
}

export interface IRoomAction extends IAction {
  payload: ReactRoom;
}
