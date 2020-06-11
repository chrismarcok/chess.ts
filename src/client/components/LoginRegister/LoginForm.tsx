import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { AxiosResponse } from "axios";
import { userLogout, ReduxState, IAction, userLogin } from "../../actions/types";
import { ReactUser } from "../../../server/models/User";
import Toast from "../../../utils/toasts";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const user = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  const clearFields = () => {
    setUsernameValue("");
    setPasswordValue("");
  };

  const loginUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userInfo = {
      username: usernameValue,
      password: passwordValue,
    };

    Axios.post("/login", userInfo)
      .then((response: AxiosResponse<ReactUser>) => {
        console.log(response);
        const user: ReactUser = response.data;
        dispatch(userLogin(user));
        clearFields();
        if (user.activated) {
          Toast.success("You have successfully logged in.")
        } else {
          Toast.warning("Please check your email to activiate your account.");
        }
      })
      .catch((err: Error) => {
        Toast.error("Could not log you in.")
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form className="login-form">
        <label>Username</label>
        <input
          id="login-username"
          name="username"
          type="text"
          required
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        ></input>
        <button className="login-btn" onClick={(e) => loginUser(e)}>
          Login
        </button>
      </form>
    </>
  );
};
