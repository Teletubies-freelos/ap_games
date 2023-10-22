import { PropsWithChildren } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import { env } from "../../config";
import { Navigate } from "react-router-dom";

interface AutenticatedProps extends PropsWithChildren {
  fallback?: JSX.Element;
}

export const Authenticated = ({
  children, 
  fallback = <Navigate to='/home'/>
}: AutenticatedProps)=>{
  const { isAuthenticated } = useAuth0()

  if(env.IS_AUTH_DISABLED)
    return <>{children}</>

  if(!isAuthenticated)
    return fallback;

  return <>{children}</>
}
