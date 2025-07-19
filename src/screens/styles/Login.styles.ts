import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 30,
    },
    title: {
      fontSize: 26,
      fontWeight: "600",
      marginBottom: 20,
      color: colors.text,
    },
    input: {
      width: "100%",
      height: 50,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 15,
      backgroundColor: colors.card,
      color: colors.text,
    },
    button: {
      width: "100%",
      backgroundColor: colors.button,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 10,
      shadowColor: colors.button,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    registerLink: {
      marginTop: 20,
      color: colors.link,
      fontSize: 14,
      textDecorationLine: "underline",
    },
  });
};
