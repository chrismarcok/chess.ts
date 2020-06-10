import React, { useState } from "react";
import { LoginForm } from "../components/LoginRegister/LoginForm";
import { RegisterForm } from "../components/LoginRegister/RegisterForm";

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {

  return (
    <>
			<LoginForm/>
			<RegisterForm/>
		</>
  );
};
