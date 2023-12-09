import { createContext, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
export const ThemeContext = createContext({ darkTheme: false });

export default function ThemeContextProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(false);
    function handleThemeSwitch() {
        setDarkTheme((prev) => !prev);
    }
    const themeContextValues = {
        darkTheme,
    };
    return (
        <ThemeContext.Provider value={themeContextValues}>
            <button id="theme-switch" className={darkTheme ? 'dark' : ''} onClick={handleThemeSwitch}>
                {darkTheme ? <MdOutlineLightMode className="icon" /> : <MdOutlineDarkMode className="icon"/>}
            </button>
            {children}
        </ThemeContext.Provider>
    );
}
