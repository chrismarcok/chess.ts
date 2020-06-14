import React, { useState } from "react";
import { LoginForm } from "../components/LoginRegister/LoginForm";
import { RegisterForm } from "../components/LoginRegister/RegisterForm";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const [showingLoginForm, setShowingLoginForm] = useState(true);

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <>
      {showingLoginForm && (
        <LoginForm
          passwordValue={passwordValue}
          setPasswordValue={setPasswordValue}
          setUsernameValue={setUsernameValue}
          usernameValue={usernameValue}
        />
      )}
      {!showingLoginForm && (
        <RegisterForm
          setShowingLoginForm={setShowingLoginForm}
          setLoginPasswordValue={setPasswordValue}
          setLoginUsernameValue={setUsernameValue}
        />
      )}

      <p>
        {showingLoginForm ? "No Account" : "Already have an account"}?{" "}
        <span
          style={{
            color: "blue",
            cursor: "pointer",
            borderBottom: "1px solid blue",
          }}
          onClick={() => setShowingLoginForm(!showingLoginForm)}
        >
          Click here
        </span>{" "}
        to {showingLoginForm ? "register" : "login"}.
      </p>
    </>
  );
};
