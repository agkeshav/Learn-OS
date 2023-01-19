import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LearnCommandsScreen from "./src/Screens/LearnCommandsScreen";
import Logout from "./src/Screens/Logout";
import HomeScreen from "./src/Screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Learn Commands" component={LearnCommandsScreen} />
      <Stack.Screen name="Accounts" component={Logout} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Learn Commands" component={LearnCommandsScreen} />
        <Drawer.Screen name="Accounts" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
