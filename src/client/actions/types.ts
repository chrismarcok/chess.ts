import { USER_LOGIN, USER_LOGOUT } from "./constants";
import { ReactUser } from "../../server/models/User";

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

export const userLogin = (user:ReactUser): IUserAction => {
  return {
    type: USER_LOGIN,
    payload: user,
  }
}

export const userLogout = (): IAction => {
  return {
    type: USER_LOGOUT,
    payload: null,
  }
}