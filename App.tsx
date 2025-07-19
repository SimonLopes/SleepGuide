import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "src/context/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
