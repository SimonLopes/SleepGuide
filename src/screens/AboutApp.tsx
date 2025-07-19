import React, { useState } from "react";
import {
  Text,
  ScrollView,
} from "react-native";
import { useTheme } from "@hooks/useTheme";
import { getStyles } from "./styles/AboutApp.styles";
import ScreenWrapper from "@components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";

export function AboutApp() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Ionicons
          name="information-circle-outline"
          style={styles.icon}
          size={130}
        />
        <Text style={styles.title}>Sobre o App</Text>
        <Text style={styles.description}>
          Este aplicativo foi desenvolvido para fins de acompanhamento do sono.
        </Text>
        <Text style={styles.developer}>Desenvolvido por Simon Lopes.</Text>
        <Text style={styles.developer}>v1.0.0</Text>
      </ScrollView>
    </ScreenWrapper>
  );
}
