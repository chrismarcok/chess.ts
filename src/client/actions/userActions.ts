import { IUserAction, IAction } from "./types";
import { USER_LOGIN } from "./constants";
import { ReactUser } from "../../utils/types";

export const userLogin = (user:ReactUser): IUserAction => {
  return {
    type: USER_LOGIN,
    payload: user,
  }
}