import React, { useState } from "react";

interface AppProps {

}

export const App: React.FC<AppProps> = ({}) => {

	const [usernameValue, setUsernameValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")

		return (
			<div>
			<form className="login-form" action="/login" method="post">
				<input
					id="login-username"
					name="username"
					type="text"
					required
					value={usernameValue}
					onChange={(e) => setUsernameValue(e.target.value)}
				></input>

				<label>Username</label>

				<input
					id="login-password"
					name="password"
					type="password"
					required
					value={passwordValue}
					onChange={(e) => setPasswordValue(e.target.value)}
				></input>

				<label>Password</label>

				<button
					className="login-btn"
					type="submit"
				>
					Login
				</button>
			</form>
		</div>
		);
}
