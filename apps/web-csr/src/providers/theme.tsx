import { CssBaseline, ThemeProvider as MUIThemeProvider, type PaletteMode } from "@mui/material"
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react"
import { darkTheme, defaultTheme } from "../../../../packages/ui/src/theme/appGames"

export const colorModeContext = createContext({
  toggleColor(){}
})

export const useToggleColor = () => {
  const { toggleColor } = useContext(colorModeContext)

  return toggleColor
}

export const ThemeProvider = ({children} : PropsWithChildren)=>{
  const [colorMode, setColorMode] = useState<PaletteMode>('dark')

  const theme = useMemo(
    ()=> colorMode === 'dark'? darkTheme : defaultTheme , 
    [colorMode]
  )

  const colorToggler = useMemo(()=> ({
    toggleColor(){
      setColorMode(prev => prev === 'dark' ? 'light' : 'dark')
    }
  }),[])

  return (
    <colorModeContext.Provider value={colorToggler}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </colorModeContext.Provider>
  )
}
