import React, { useEffect } from "react";
import { ReduxState, userActivate } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import Axios, { AxiosError } from "axios";
import toast from "../../utils/toasts";
import { useParams, useHistory } from "react-router";

interface ActivatePageProps {}

export const ActivatePage: React.FC<ActivatePageProps> = ({}) => {
  const user = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    Axios.put(`/api/users/${userId}/activate`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Successfully activated your account.");
          dispatch(userActivate());
          setTimeout(() => {
            history.push("/");
          }, 2500);
        } else {
          toast.error("Unexpected HTTP Response Code. Tell chris!");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      {user.activated && <div>You already appear to be activated...</div>}
      {!user.activated && <div>Attempting to activate...</div>}
    </>
  );
};
