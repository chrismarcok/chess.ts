import { ReactUser } from "../../server/models/User";
import { IUserAction, IAction } from "./types";
import { LOCAL_STORAGE_USER, USER_LOGIN, USER_LOGOUT, USER_ACTIVATE } from "./constants";

export const userLogin = (user:ReactUser): IUserAction => {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
  return {
    type: USER_LOGIN,
    payload: user,
  }
}

export const userLogout = (): IAction => {
  return {
    type: USER_LOGOUT,
  }
}

export const userActivate = (): IAction => {
  return {
    type: USER_ACTIVATE,
  }
}