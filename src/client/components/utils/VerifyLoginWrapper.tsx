import React, { useEffect } from 'react'
import { verifyLogin } from '../../../utils/user';
import { useDispatch } from 'react-redux';

interface VerifyLoginWrapperProps {}

export const VerifyLoginWrapper: React.FC<VerifyLoginWrapperProps> = ({children}) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    verifyLogin(dispatch);
  }, []);  

  return (
    <>
      {children}
    </>
    );
}