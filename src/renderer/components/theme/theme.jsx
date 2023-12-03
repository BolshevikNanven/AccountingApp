import { useEffect, useState, createContext, useContext } from "react"
import { useGlobalState } from "../../store/provider/state-provider";

const ThemeContext = createContext()

export function useTheme() {
    return [useContext(ThemeContext)[0], useContext(ThemeContext)[1]];
}


export default function ThemeProvider({ children }) {
    const [globalState, dispatchGlobalStateData] = useGlobalState()

    const rawSetTheme = (theme) => {
        const root = window.document.documentElement
        const isDark = theme === "dark"

        root.classList.remove(isDark ? "light" : "dark")
        root.classList.add(theme)

    }

    const toggleTheme = () => {
        if (globalState.theme === 'dark') {
            dispatchGlobalStateData({ theme: 'light' })
        } else dispatchGlobalStateData({ theme: 'dark' })
    }


    useEffect(() => {
        rawSetTheme(globalState.theme || 'light')
    }, [globalState.theme])

    return (
        <ThemeContext.Provider value={[globalState.theme, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}