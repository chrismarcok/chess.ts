import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import { ReduxState } from '../actions/types';
import { PregameLobby } from '../components/game/PregameLobby';
import Axios, { AxiosError } from 'axios';
import toast from "../../utils/toasts";
import { useHistory } from 'react-router';

const socket = io.connect();

interface RoomPageProps {

}

export const RoomPage: React.FC<RoomPageProps> = ({}) => {

  const { roomId } = useParams();
  const history = useHistory();

  const room = useSelector((state: ReduxState) => state.room);

  useEffect(() => {
    Axios.get(`/api/rooms/${roomId}`)
      .then(response => {
        console.log(response);
      })
      .catch((err: AxiosError) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          history.push("/");
      });
  }, []);

    return (
      <>
      {!room.started && <PregameLobby/>}
      {room.ended && <div>This game has ended.</div>}
      </>
    );
}