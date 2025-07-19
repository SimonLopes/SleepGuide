import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "@hooks/useTheme";

type Props = {
  children: ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
  const { colors, isDark } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        animated={true}
        backgroundColor={colors.background}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
