import { PropsWithChildren, createContext, useCallback } from "react"

export const SessionContext = createContext<((object: Record<string, string | number>) => void)>(() => {});

export const SessionProvider = ({children} : PropsWithChildren)=>{
  const objectToSession = useCallback((object: Record<string, string | number>) => Object
    .keys(object)
    .forEach((key)=> sessionStorage.setItem(key, String(object[key])))
  , [])

  return (
    <SessionContext.Provider value={objectToSession}>
      {children}
    </SessionContext.Provider>
  )
}
