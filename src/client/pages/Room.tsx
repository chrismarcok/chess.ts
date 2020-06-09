import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";

const socket = io.connect();

interface RoomProps {

}

export const Room: React.FC<RoomProps> = ({}) => {

  const { roomId } = useParams();

  const sendMessage = (message: string) => {
    socket.emit("message", message);
  }

  useEffect(() => {
    socket.emit('new-user', {
      user: "Joe Shmoe",
      room: roomId,
    });
  }, []);

    return (
      <div onClick={() => {
        sendMessage("Hello World");
      }}>
        {roomId}
      </div>
    );
}