import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Account from "../screens/Account";
import Settings from "../screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "@hooks/useTheme";
import { getStyles } from "@screens/styles/Tabbar.styles";
import { EditProfile } from "@screens/EditProfile";
import { AboutApp } from "@screens/AboutApp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabbarContainer,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarItemStyle: {
            flex: 1,

          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                height: 70,
              }}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color={focused ? "#007aff" : "#ccc"}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#007aff",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                top: -20,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 10 },
              }}
            >
              <Ionicons name="bed-outline" size={28} color="#fff" />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                flex:1
              }}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "#007aff" : "#ccc"}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
