import React from "react";
import { useHistory } from "react-router";
import { ReduxState } from "../actions/types";
import { useSelector } from "react-redux";

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const history = useHistory();
  const user = useSelector((state: ReduxState) => state.user);

  return (
    <>
      {!user._id && (
        <div onClick={() => history.push("/login")} className="button-simple">Click here to log in.</div>
      )}
      {user._id && (
        <div onClick={() => history.push("/startGame")} className="button-simple">Click here start a game.</div>
      )}
    </>
  );
};
