import React, {useState} from 'react'

interface LoginFormProps {

}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

    return (
      <>
      <h1>Login</h1>
      <form className="login-form" action="/login" method="post">
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
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      </>
    );
}