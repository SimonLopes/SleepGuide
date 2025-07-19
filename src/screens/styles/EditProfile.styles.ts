import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 50,
      flexGrow: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 30,
      textAlign: "center",
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
    },
    cameraIconText: {
      fontSize: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
      fontWeight: "600",
      color: colors.text,
    },
    input: {
      height: 48,
      borderRadius: 12,
      borderWidth: 1.5,
      paddingHorizontal: 14,
      fontSize: 16,
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
    },
    button: {
      marginTop: 30,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text 
    },
  });
};
