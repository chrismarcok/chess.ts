import Axios, { AxiosResponse } from "axios";
import { ReactUser } from "../server/models/User";
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_ROOM } from "../client/actions/constants";
import { userLogin, userLogout } from "../client/actions/userActions";
import { IAction } from "../client/actions/types";
import _ from "lodash";
import { ReactRoom } from "../server/models/Room";
import { roomCreate, destroyRoom } from "../client/actions/roomActions";

/**
 * Gets the user from localstorage, if it exists, then it puts it into redux store.
 * Then it pings /api/me to see who is actually logged in. If they differ, update
 * local storage and redux store. If they are the same, then do nothing!
 * 
 * If nobody is actually logged in, then clear local storage and redux store.
 */
export const verifyRoom = async (dispatchCallback: (action: IAction) => void) => {

  const localStorageRoom: ReactRoom = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ROOM));
  if (localStorageRoom){
    dispatchCallback(roomCreate(localStorageRoom));
  }

  const currentRoom: ReactRoom = await getCurrentRoom();

  if (currentRoom){
    if (!_.isEqual(currentRoom, localStorageRoom)){
      localStorage.setItem(LOCAL_STORAGE_ROOM, JSON.stringify(currentRoom));
      dispatchCallback(roomCreate(currentRoom));
    }
  } else {
    dispatchCallback(destroyRoom());
    localStorage.removeItem(LOCAL_STORAGE_ROOM);
  }      
}

/**
 * GET /api/me and return the actually currently logged in ReactUser.
 */
export const getCurrentRoom = async ():Promise<ReactRoom> => {
  try {
    const response: AxiosResponse<ReactRoom> = await Axios.get("/api/rooms/mine");
    return response.data;
  } catch {
    return null;
  }
}