export type ThemeType = "light" | "dark";

export const themes = {
  light: {
    background: "#F6F8FC",
    text: "#1C1C1E",
    primary: "#7B9ACC",
    secondary: "#A2B8E0",
    border: "#DDE3EC",
    card: "#FFFFFF",
    button: "#1E90FF",
    link: "#1E90FF",
  },
  dark: {
    background: "#121212",
    text: "#E5E5E7",
    primary: "#90B4FF",
    secondary: "#5F6F94",
    border: "#2C2C2E",
    card: "#1E1E1E",
    button: "#1E90FF",
    link: "#1E90FF",
  },
} as const;

export type ThemeName = keyof typeof themes;

export type ThemeColors = (typeof themes)[ThemeName];
