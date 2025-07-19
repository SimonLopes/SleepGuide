import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@hooks/useTheme";
import { getStyles } from "./styles/EditProfile.styles";
import ScreenWrapper from "@components/ScreenWrapper";

export function EditProfile() {
  const { colors, theme } = useTheme();
  const styles = getStyles(theme);

  const [name, setName] = useState("Simon Lopes");
  const [birthDate, setBirthDate] = useState("01/01/1990");
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
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, {}]}>Editar Perfil</Text>

        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <Image source={{ uri: imageUri }} style={styles.avatar} />
          <View
            style={[
              styles.cameraIconContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.cameraIconText}>📷</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de nascimento</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="dd/mm/aaaa"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}
