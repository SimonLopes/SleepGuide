import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemeContext } from "@context/ThemeContext";
import { getStyles } from "./styles/Settings.styles";
import ScreenWrapper from "@components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storageEmitter from "src/utils/storageEvents";
import { MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";
import { requireNativeModule } from "expo-modules-core";
import MaskInput, { Mask } from "react-native-mask-input";

const Sleepguidewidget = requireNativeModule("Sleepguidewidget");



const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [wakeUpTime, setWakeUpTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [recommendationType, setRecommendationType] = useState<
    "wake" | "sleep"
  >("wake");

  const syncWithWidget = async () => {
    try {
      await Sleepguidewidget.setSleepWidgetData(wakeUpTime, sleepTime, recommendationType);
    } catch (e) {
      console.error("Erro ao atualizar widget:", e);
    }
  };  

  const timeMask: Mask = (value?: string) => {
    const text = value || "";
    const cleanTime = text.replace(/\D+/g, '')
    
    const hourFirstDigit = /[012]/
    let hourSecondDigit = /\d/
    
    if (cleanTime.charAt(0) === "2") {
      hourSecondDigit = /[0123]/
    }
    
    const minuteFirstDigit = /[012345]/
    const minuteSecondDigit = /\d/

    return [hourFirstDigit, hourSecondDigit , ":", minuteFirstDigit , minuteSecondDigit]
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const wake = await AsyncStorage.getItem("wakeTime");
        const sleep = await AsyncStorage.getItem("sleepTime");
        const mode = await AsyncStorage.getItem("sleepMode");

        if (wake) setWakeUpTime(wake);
        if (sleep) setSleepTime(sleep);
        if (mode === "wake" || mode === "sleep") setRecommendationType(mode);
      } catch (e) {
        console.warn("Erro ao carregar configurações:", e);
      }
    };

    loadData();
  }, []);

  const handleChangeWakeUpTime = async () => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const [hh, mm] = wakeUpTime.split(":").map(Number);
    if (hh > 23 || mm > 59) {
      alert("Horário inválido");
      setWakeUpTime("07:00");
    }

    if (regex.test(wakeUpTime)) {
      await AsyncStorage.setItem("wakeTime", wakeUpTime);
    } else {
      alert("Por favor, insira um horário válido no formato HH:MM");
    }
    storageEmitter.emit("storageChanged");
    syncWithWidget();
  };

  const handleChangeSleepTime = async () => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const [hh, mm] = wakeUpTime.split(":").map(Number);
    if (hh > 23 || mm > 59) {
      alert("Horário inválido");
      setWakeUpTime("07:00");
    }

    if (regex.test(sleepTime)) {
      await AsyncStorage.setItem("sleepTime", sleepTime);
    } else {
      alert("Por favor, insira um horário válido no formato HH:MM");
    }
    storageEmitter.emit("storageChanged");
    syncWithWidget();
  };

  const handleChangeRecommendation = async (rec: "wake" | "sleep") => {
    setRecommendationType(rec);
    await AsyncStorage.setItem("sleepMode", rec);
    storageEmitter.emit("storageChanged");
    syncWithWidget();
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Configurações</Text>

          <View style={styles.settingGroup}>
            <View style={styles.cardHeader}>
              <Ionicons name="sunny-outline" size={18} style={styles.icons} />
              <Text style={styles.cardTitle}>Horário de acordar</Text>
            </View>
            <MaskInput
              mask={timeMask}
              value={wakeUpTime}
              onChangeText={(text) => setWakeUpTime(text)}
              onEndEditing={handleChangeWakeUpTime}
              keyboardType="numeric"
              placeholder="07:00"
              maxLength={5}
              style={styles.input}
            />
            <Text style={styles.helperText}>
              Defina o horário em que você normalmente acorda.
            </Text>
          </View>

          <View style={styles.settingGroup}>
            <View style={styles.cardHeader}>
              <Ionicons name="moon-outline" size={18} style={styles.icons} />
              <Text style={styles.cardTitle}>Horário de dormir</Text>
            </View>
            <MaskInput
              mask={timeMask}
              style={styles.input}
              value={sleepTime}
              onChangeText={(text) => setSleepTime(text)}
              onEndEditing={handleChangeSleepTime}
              keyboardType="numeric"
              placeholder="23:00"
              maxLength={5}
            />
            <Text style={styles.helperText}>
              Defina o horário em que você normalmente vai dormir.
            </Text>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.label}>🧠 Basear recomendações em:</Text>
            <View style={styles.switchContainer}>
              <Pressable
                style={[
                  styles.selectorButton,
                  recommendationType === "wake" && styles.selectorActive,
                ]}
                onPress={() => handleChangeRecommendation("wake")}
              >
                <Text
                  style={[
                    styles.selectorText,
                    recommendationType === "wake" && styles.selectorTextActive,
                  ]}
                >
                  Hora de acordar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.selectorButton,
                  recommendationType === "sleep" && styles.selectorActive,
                ]}
                onPress={() => handleChangeRecommendation("sleep")}
              >
                <Text
                  style={[
                    styles.selectorText,
                    recommendationType === "sleep" && styles.selectorTextActive,
                  ]}
                >
                  Hora de dormir
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Settings;
