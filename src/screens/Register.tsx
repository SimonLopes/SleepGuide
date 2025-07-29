import { AuthContext } from "@context/AuthContext";
import { ThemeContext } from "@context/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
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
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { userRegister } from "src/api/register";
import { RootStackParamList } from "../types/navigation";
import { getStyles } from "./styles/Register.styles";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const styles = getStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (
      name === "" ||
      dateOfBirth === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }
    await userRegister({
      name,
      dateOfBirth,
      email,
      password,
    }).then((response) => {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
    });
  };

  const [imageUri, setImageUri] = useState("https://i.pravatar.cc/150?img=12");

  async function pickImage() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para acessar a galeria é necessária!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* <Image source={require("../../../assets/logo.png")} style={styles.logo} /> */}

          <Text style={styles.title}>Cadastrar-se</Text>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <Image source={{ uri: imageUri }} style={styles.avatar} />
            <View style={styles.cameraIconContainer}>
              <Text style={styles.cameraIconText}>📷</Text>
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <MaskInput
            style={styles.input}
            placeholder="Data de nascimento"
            mask={Masks.DATE_DDMMYYYY}
            placeholderTextColor="#999"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.registerLink}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
