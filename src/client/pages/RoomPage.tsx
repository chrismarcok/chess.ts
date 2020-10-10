import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../actions/types";
import { PregameLobby } from "../components/game/PregameLobby";
import Axios, { AxiosError, AxiosResponse } from "axios";
import toast from "../../utils/toasts";
import { useHistory } from "react-router";
import { initial } from "lodash";

const socket = io.connect();

interface RoomPageProps {}

export const RoomPage: React.FC<RoomPageProps> = ({}) => {

  const { roomId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    initializeSocket(roomId);
  }, []);

  const initializeSocket = (roomId: string) => {
      socket.emit("create", roomId);
      socket.emit("user-joined", { user });
  }
  

  return (
    <>
      <PregameLobby socket={socket} user={user} />
    </>
  );
};
