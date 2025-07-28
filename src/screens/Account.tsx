import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getStyles } from "./styles/Account.styles";
import ScreenWrapper from "src/components/ScreenWrapper";
import { useTheme } from "@hooks/useTheme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/types/navigation";

export default function Account() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, isDark, colors } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.displayName || user?.email}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Ionicons name="create-outline" size={22} color={colors.text} />
            <Text style={styles.actionText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <MaterialIcons name="support-agent" size={22} color={colors.text} />
            <Text style={styles.actionText}>Suporte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate("AboutApp")}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={colors.text}
            />
            <Text style={styles.actionText}>Sobre o app</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={toggleTheme}>
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={22}
              color={colors.text}
            />
            <Text style={styles.actionText}>
              Usar modo {isDark ? "claro" : "escuro"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={logout}>
            <Ionicons name="log-out-outline" size={22} color="#ff3b30" />
            <Text style={[styles.actionText, { color: "#ff3b30" }]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
