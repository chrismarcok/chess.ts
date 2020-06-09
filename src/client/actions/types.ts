import { EXAMPLE_TYPE } from "./constants";

export const EXAMPLE_ACTION: IAction = {
  payload: "test",
  type: EXAMPLE_TYPE
}

export interface IAction {
  payload: any;
  type: string;
}