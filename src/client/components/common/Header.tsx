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
      </ul>
    </div>
  );
};
