import Axios, { AxiosResponse } from "axios";
import { ReactUser } from "../server/models/User";
import { LOCAL_STORAGE_USER } from "../client/actions/constants";
import { userLogin, userLogout } from "../client/actions/userActions";
import { IAction } from "../client/actions/types";
import _ from "lodash";

/**
 * Gets the user from localstorage, if it exists, then it puts it into redux store.
 * Then it pings /api/me to see who is actually logged in. If they differ, update
 * local storage and redux store. If they are the same, then do nothing!
 * 
 * If nobody is actually logged in, then clear local storage and redux store.
 */
export const verifyLogin = async (dispatchCallback: (action: IAction) => void) => {

  const localStorageUser: ReactUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  if (localStorageUser){
    dispatchCallback(userLogin(localStorageUser));
  }

  const loggedInUser: ReactUser = await getLoggedInUser();

  if (loggedInUser){
    if (!_.isEqual(loggedInUser, localStorageUser)){
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(loggedInUser));
      dispatchCallback(userLogin(loggedInUser));
    }
  } else {
    dispatchCallback(userLogout());
    localStorage.removeItem(LOCAL_STORAGE_USER);
  }      
}

/**
 * GET /api/me and return the actually currently logged in ReactUser.
 */
export const getLoggedInUser = async ():Promise<ReactUser> => {
  try {
    const response: AxiosResponse<ReactUser> = await Axios.get("/api/me");
    return response.data;
  } catch {
    return null;
  }
}