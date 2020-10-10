import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Axios, { AxiosError, AxiosResponse } from "axios";
import Toast from "../../utils/toasts";

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const dispatch = useDispatch();

  const startGame = () => {
    window.location.href = "/rooms/1";
  }

  return (
    <div>
        <div onClick={startGame} className="button-simple">Click here start a game.</div>
    </div>
  );
};
