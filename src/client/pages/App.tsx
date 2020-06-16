import React from "react";
import { useHistory } from "react-router";
import { ReduxState } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import Axios, { AxiosError, AxiosResponse } from "axios";
import Toast from "../../utils/toasts";
import { IRoom, ReactRoom } from "../../server/models/Room";
import { roomCreate } from "../actions/roomActions";

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const history = useHistory();
  const user = useSelector((state: ReduxState) => state.user);
  const room = useSelector((state: ReduxState) => state.room);
  const dispatch = useDispatch();

  const startGame = () => {
    fetch("api/rooms/mine")
    .then(async response => {
      if (response.status === 400) {
        console.log('%cLOOK HERE','color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold');
        return Axios.post("/api/rooms");
      } else {
        const data = await response.json()
        throw data;
      }
    })
    .then((response: AxiosResponse<ReactRoom>) => {
      if (response.status === 200){
        const room = response.data;
        dispatch(roomCreate(room));
        history.push(`/rooms/${room._id}`);
      }
    })
    .catch((err: any) => {
      console.log(err);
      if (err._id){
        Toast.warning("It appears you are already hosting a game. Redirecting...", 4000);
        dispatch(roomCreate(err));
        history.push(`/rooms/${err._id}`);
      }
    });
  }

  return (
    <>
      {!user._id && (
        <div onClick={() => history.push("/login")} className="button-simple">Click here to log in.</div>
      )}
      {user._id && !room._id && (
        <div onClick={startGame} className="button-simple">Click here start a game.</div>
      )}
      {room._id && <div onClick={() => history.push(`/rooms/${room._id}`)} className="button-simple">Reconnect to room.</div>}
    </>
  );
};
