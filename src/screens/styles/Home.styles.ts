import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    gridCard: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
    },
    card: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    cardHeader: {
      flex: 1,
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
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
    cardTime: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.primary,
    },
    cardTimesLine: {
      gap: 8,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    cardTimes: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.secondary,
    },
    cardNote: {
      fontSize: 14,
      color: colors.text,
      marginTop: 4,
      opacity: 0.7,
    },
    circleContainer: {
      alignItems: "center",
      marginTop: 40,
    },
  });
};
