import React, { useState } from "react";
import Axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface RegisterFormProps {
  setShowingLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginUsernameValue: React.Dispatch<React.SetStateAction<string>>;
  setLoginPasswordValue: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  setShowingLoginForm,
  setLoginUsernameValue,
  setLoginPasswordValue,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repasswordValue, setRepasswordValue] = useState("");
  const [errText, setErrText] = useState("");

  const resetFields = () => {
    setErrText("");
    setUsernameValue("");
    setPasswordValue("");
    setRepasswordValue("");
    setEmailValue("");
  };

  const registerUser = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (passwordValue.length <= 5) {
      setErrText("Passwords must be longer than 5 characters.");
      return;
    }

    if (repasswordValue !== passwordValue) {
      setErrText("Passwords do not match.");
      return;
    }

    const user = {
      username: usernameValue,
      password: passwordValue,
      email: emailValue,
    };

    Axios.post("/api/users", user)
      .then((response) => {
        console.log(response);
        toast.success(
          `Successfully created user ${usernameValue}. Check your email to complete registration.`
        );
        resetFields();
        setLoginUsernameValue(usernameValue);
        setLoginPasswordValue(passwordValue);
        setShowingLoginForm(true);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
        console.log(`Axios ERROR: ${err}`);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form className="register-form" onSubmit={(e) => registerUser(e)}>
        <label>Username</label>
        <input
          id="register-username"
          name="username"
          type="text"
          required
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          required
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        ></input>

        <label>Confirm Password</label>
        <input
          id="register-repassword"
          name="repassword"
          type="password"
          required
          value={repasswordValue}
          onChange={(e) => setRepasswordValue(e.target.value)}
        ></input>
        {errText && (
          <p style={{ fontSize: "0.8rem", color: "red" }}>{errText}</p>
        )}
        <button className="login-btn" onClick={(e) => registerUser(e)}>
          Register
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
    </>
  );
};
