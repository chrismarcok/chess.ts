import { IAction } from "../actions/types";
import { USER_LOGIN } from "../actions/constants";
import { ReactUser } from "../../utils/types";

export const nullUser: ReactUser = {
  username: null,
};

export default (state = nullUser, action: IAction): ReactUser => {
  switch (action.type) {
    case USER_LOGIN: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
