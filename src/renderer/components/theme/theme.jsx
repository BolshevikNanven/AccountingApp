import { useEffect, useState, createContext, useContext } from "react"

const ThemeContext = createContext()

export function useTheme() {
    return [useContext(ThemeContext)[0], useContext(ThemeContext)[1]];
}


export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')

    const rawSetTheme = theme => {
        const root = window.document.documentElement
        const isDark = theme === "dark"

        root.classList.remove(isDark ? "light" : "dark")
        root.classList.add(theme)

    }

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        }else setTheme('dark')
    }


    useEffect(() => {
        rawSetTheme(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}