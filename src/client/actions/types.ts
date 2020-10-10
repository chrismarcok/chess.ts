import { ReactUser } from "../../utils/types";

export interface ReduxState {
  user: ReactUser;
}

export interface IAction {
  payload?: any;
  type: string;
}

export interface IUserAction extends IAction {
  payload: ReactUser;
}