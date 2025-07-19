import React, { createContext, useState, useEffect } from "react";
import { ThemeName } from "@styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeContextType = {
  theme: ThemeName;
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeName = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
