import { useContext } from "react";
import { ThemeContext } from "@context/ThemeContext";
import { themes, ThemeType } from "@styles/theme";

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = themes[theme as ThemeType];

  return {
    theme,
    toggleTheme,
    colors,
    isDark: theme === "dark",
  };
}
