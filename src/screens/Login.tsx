import { AuthContext } from "@context/AuthContext";
import { ThemeContext } from "@context/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { RootStackParamList } from "../types/navigation";
import { getStyles } from "./styles/Login.styles";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const styles = getStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    //setLoading(true);
    await login(email, password);
    //setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <Text style={{ color: "#999", marginBottom: 20, fontSize: 16 }}>
              Carregando...
            </Text>
          ) : (
            <>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Entrar</Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Criar uma conta</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
