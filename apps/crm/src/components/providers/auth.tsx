import { useAuth0 } from "@auth0/auth0-react"
import { LoadingPage } from "../../../../../packages/ui/src"
import { PropsWithChildren } from "react"

export const AuthProvider = ({children}: PropsWithChildren)=>{
  const { isLoading } = useAuth0()

  if(isLoading)
    return <LoadingPage />

  return <>{children}</>
}
