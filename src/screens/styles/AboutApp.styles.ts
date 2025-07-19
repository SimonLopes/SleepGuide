import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 50,
      flexGrow: 1,
      alignItems: "center",
    },
    icon: {
      color: colors.text,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      color: colors.text,
      marginBottom: 30,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 80,
      textAlign: "center",
      lineHeight: 24,
    },
    developer: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 20,
      lineHeight: 24,
      fontWeight: "300",
    },
  });
};
