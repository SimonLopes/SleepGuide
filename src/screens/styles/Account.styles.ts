import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      alignItems: "center",
      paddingVertical: 40,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    profileContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    name: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },
    email: {
      fontSize: 14,
      color: colors.text,
    },
    actions: {
      width: "90%",
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    actionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    actionText: {
      marginLeft: 12,
      fontSize: 16,
      color: colors.text,
    },
  });
};
