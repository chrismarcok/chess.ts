import { IAction} from "../actions/types";
import { EXAMPLE_TYPE } from "../actions/constants";



const initialState = {
  text: "",
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case EXAMPLE_TYPE:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
}