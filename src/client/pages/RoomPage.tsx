import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../actions/types";
import { PregameLobby } from "../components/game/PregameLobby";
import Axios, { AxiosError, AxiosResponse } from "axios";
import toast from "../../utils/toasts";
import { useHistory } from "react-router";
import { ReactRoom } from "../../server/models/Room";
import { roomCreate } from "../actions/roomActions";
import { ReactUser } from "../../server/models/User";

const socket = io.connect();

interface RoomPageProps {}

export const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const [isSocketInit, setIsSocketInit] = useState(false);

  const { roomId } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const room = useSelector((state: ReduxState) => state.room);
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    if (!isSocketInit){
      if (roomId !== room._id){
        Axios.get(`/api/rooms/${roomId}`)
        .then((response: AxiosResponse<ReactRoom>) => {
          dispatch(roomCreate(response.data));
          initializeSocket(user, room);
        })
        .catch((err: AxiosError) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          history.push("/");
        });
      } else {
        initializeSocket(user, room);
      }
    }
  }, [room, user]);

  const initializeSocket = (user: ReactUser, room:ReactRoom) => {
    if (user && user._id && room && room._id){
      setIsSocketInit(true);
      socket.emit("create", roomId);
      socket.emit("user-joined", { user, room });
    }
  }

  return (
    <>
      {!room.started && room._id && user._id && <PregameLobby socket={socket} room={room} user={user} />}
      {room.ended && <div>This game has ended.</div>}
    </>
  );
};
