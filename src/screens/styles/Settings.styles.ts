import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 30,
    },
    cardHeader: {
      flex: 1,
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      paddingBottom: 5,
    },
    icons: {
      color: colors.text,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
      textTransform: "capitalize",
    },
    settingGroup: {
      marginBottom: 25,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 10,
      fontSize: 16,
      color: colors.text,
    },
    helperText: {
      fontSize: 13,
      color: colors.secondary,
      marginTop: 5,
    },
    switchContainer: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
    selectorButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    selectorActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    selectorText: {
      color: colors.text,
      fontWeight: "500",
    },
    selectorTextActive: {
      color: "#fff",
    },
  });
};
