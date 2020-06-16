import React, { useEffect } from 'react'
import { verifyLogin } from '../../../utils/user';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../actions/types';
import { verifyRoom } from '../../../utils/room';

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({children}) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state:ReduxState) => state.user)

  useEffect(() => {
    verifyLogin(dispatch);
  }, []);  

  useEffect(() => {
    if (user._id){
      verifyRoom(dispatch);
    }
  }, [user]);  

  return (
    <>
      {children}
    </>
    );
}