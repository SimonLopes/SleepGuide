import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    safeView: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: 30,
    },
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
    avatarContainer: {
      alignSelf: "center",
      position: "relative",
      marginBottom: 30,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    cameraIconContainer: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: 38,
      height: 38,
      borderRadius: 19,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 2 },
      backgroundColor: colors.primary,
    },
    cameraIconText: {
      fontSize: 20,
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
