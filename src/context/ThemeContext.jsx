import { createContext, useContext, useState , useEffect } from "react";
import api from "../api/apiClient.js";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const getTheme=async()=>{
    try {
      const response=await api.get("/userSettings/get-settings");
      const savedTheme = response.data.theme || "dark";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getTheme();
  },[]);

  const toggleTheme = async() => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      await api.patch("/userSettings/update-settings",{
        theme:next
      });
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);