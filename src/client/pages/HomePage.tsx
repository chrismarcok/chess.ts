import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginRegister/LoginForm";
import { RegisterForm } from "../components/LoginRegister/RegisterForm";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const [showingLoginForm, setShowingLoginForm] = useState(true);

  return (
    <>
      {showingLoginForm && <LoginForm />}
      {!showingLoginForm && <RegisterForm />}

      <p>
        {showingLoginForm ? "No Account" : "Already have an account"}?{" "}
        <span
          style={{ color: "blue", cursor: "pointer", borderBottom: "1px solid blue" }}
          onClick={() => setShowingLoginForm(!showingLoginForm)}
        >
          Click here
        </span>{" "}
        to {showingLoginForm ? "register" : "login"}.
      </p>
    </>
  );
};
