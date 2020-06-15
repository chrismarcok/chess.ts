import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../actions/types";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const user = useSelector((state: ReduxState) => state.user);

  const go = (dest: string) => {
    window.location.replace(dest);
  };

  return (
    <div className="header-container">
      <ul>
        <li onClick={() => go("/")} className="clickable">
          Home
        </li>
        {!user._id && (
          <li onClick={() => go("/login")} className="clickable">
            Login
          </li>
        )}
        {user._id && (
          <li onClick={() => go("/logout")} className="clickable">
            Logout
          </li>
        )}
        {user._id && (
          <li onClick={() => go("/api/me")} className="clickable">
            Currently Logged in as: <span className="avatar" style={{backgroundImage: `url(${user.avatarURL})`}}></span>
            {user.username}
          </li>
        )}
      </ul>
    </div>
  );
};
