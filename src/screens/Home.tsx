import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { ThemeContext } from "@context/ThemeContext";
import { getStyles } from "./styles/Home.styles";
import ScreenWrapper from "@components/ScreenWrapper";
import { formatHoursDecimalToHHMM } from "src/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { useSleepCalculator } from "@hooks/useSleepCalculate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


const Home = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [wakeUp, setWakeUp] = useState<string | null>(null);
  const [sleep, setSleep] = useState<string | null>(null);
  const [mode, setMode] = useState<"wake" | "sleep">("wake");

  const parseTimeString = (
    timeStr: string
  ): { hour: number; minute: number } => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return { hour, minute };
  };

  useFocusEffect(
    useCallback(() => {
      const loadStoredTimes = async () => {
        try {
          const wakeUpStr = await AsyncStorage.getItem("wakeTime");
          const sleepStr = await AsyncStorage.getItem("sleepTime");
          const modeStr = await AsyncStorage.getItem("sleepMode");

          if (wakeUpStr) setWakeUp(wakeUpStr);
          if (sleepStr) setSleep(sleepStr);
          if (modeStr === "sleep" || modeStr === "wake") setMode(modeStr);
        } catch (e) {
          console.error("Erro ao carregar horários salvos:", e);
        }
      };

      const unsubscribe = loadStoredTimes();

      return () => {
        unsubscribe;
      };
    }, [])
  );

  const { idealTime, cycles } = useSleepCalculator({
    mode,
    wakeUpTime: wakeUp ? wakeUp : '07:00',
    sleepTime: sleep ? sleep : '23:00',
  });

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seu Guia de Sono</Text>
        <View style={styles.gridCard}>
          <View style={styles.card}>
            <View style={{ flex: 1, gap: 10 }}>
              <View style={styles.cardHeader}>
                <Ionicons name="alarm-outline" size={18} style={styles.icons} />
                <Text style={styles.cardTitle}>Horário de Acordar</Text>
              </View>
              <Text style={styles.cardTime}>{wakeUp}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flex: 1, gap: 10 }}>
              <View style={styles.cardHeader}>
                <Ionicons name="moon-outline" size={18} style={styles.icons} />
                <Text style={styles.cardTitle}>Horário para Dormir</Text>
              </View>
              <Text style={styles.cardTime}>{sleep}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1, gap: 10 }}>
            <View style={styles.cardHeader}>
              <Ionicons name="bed-outline" size={18} style={styles.icons} />
              <Text style={styles.cardTitle}>Ideal para Dormir</Text>
            </View>
            <Text style={styles.cardTime}>
              {idealTime.time}
            </Text>
          </View>
          <CircularProgress
            value={
              (idealTime.durationHours! /
                24) * 100
            }
            maxValue={100}
            radius={35}
            title={`${formatHoursDecimalToHHMM(idealTime.durationHours!)}`}
            subtitle={"horas de sono"}
            showProgressValue={false}
            progressValueColor={theme === "dark" ? "#fff" : "#000"}
            titleColor={theme === "dark" ? "#fff" : "#000"}
            subtitleColor={theme === "dark" ? "#aaa" : "#555"}
            activeStrokeColor={
              cycles[0]?.durationHours >= 7 ? "#4CAF50" : "#d63636"
            }
            inActiveStrokeColor="#ddd"
            inActiveStrokeOpacity={0.2}
            activeStrokeWidth={8}
            titleFontSize={18}
            subtitleFontSize={6}
          />
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1, gap: 10 }}>
            <View style={styles.cardHeader}>
              <Ionicons name="sunny-outline" size={18} style={styles.icons} />
              <Text style={styles.cardTitle}>Ideal para Acordar</Text>
            </View>
            <Text style={styles.cardTime}>
              {mode === "sleep" ? idealTime.time : wakeUp}
            </Text>
          </View>

          <CircularProgress
            value={
              (idealTime.durationHours! /
                24) *
              100
            }
            maxValue={100}
            radius={35}
            title={`${formatHoursDecimalToHHMM(idealTime.durationHours!)}`}
            subtitle={"horas de sono"}
            showProgressValue={false}
            progressValueColor={theme === "dark" ? "#fff" : "#000"}
            titleColor={theme === "dark" ? "#fff" : "#000"}
            subtitleColor={theme === "dark" ? "#aaa" : "#555"}
            activeStrokeColor={
              cycles[0]?.durationHours >= 7 ? "#4CAF50" : "#d63636"
            }
            inActiveStrokeColor="#ddd"
            inActiveStrokeOpacity={0.3}
            activeStrokeWidth={8}
            titleFontSize={18}
            subtitleFontSize={6}
          />
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1, gap: 10 }}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="play-forward-outline"
                size={18}
                style={styles.icons}
              />
              <Text style={styles.cardTitle}>
                Próximo horário para {mode === "sleep" ? "acordar" : "dormir"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.cardTime}>{cycles[0]?.time}</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.cardTimesLine}>
                  {cycles.map((item, index) => {
                    if (index === 0) return null;
                    return (
                      <Text key={index} style={styles.cardTimes}>
                        {item.time}
                      </Text>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
          <CircularProgress
            value={(cycles[0]?.durationHours! / 24) * 100}
            maxValue={100}
            radius={35}
            title={`${formatHoursDecimalToHHMM(cycles[0]?.durationHours!)}`}
            subtitle={"horas de sono"}
            showProgressValue={false}
            progressValueColor={theme === "dark" ? "#fff" : "#000"}
            titleColor={theme === "dark" ? "#fff" : "#000"}
            subtitleColor={theme === "dark" ? "#aaa" : "#555"}
            activeStrokeColor={
              cycles[0]?.durationHours >= 7 ? "#4CAF50" : "#d63636"
            }
            inActiveStrokeColor="#ddd"
            inActiveStrokeOpacity={0.2}
            activeStrokeWidth={8}
            titleFontSize={18}
            subtitleFontSize={6}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;
