import { StyleSheet } from "react-native";
import { themes, ThemeType } from "./theme";

export const getStyles = (theme: ThemeType) => {
  const colors = themes[theme];

  return StyleSheet.create({
    tabbarContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 70,
      borderTopWidth: 0,
      backgroundColor: colors.card,
      position: "absolute",
      bottom: 20,
      marginHorizontal: 20,
      borderRadius: 30,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: { width: 10, height: 10 },
    },
  });
};
