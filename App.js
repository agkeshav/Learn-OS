import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import LearnCommandsScreen from "./src/Screens/LearnCommandsScreen";
import Logout from "./src/Screens/Logout";
import HomeScreen from './src/Screens/HomeScreen';

const Drawer = createDrawerNavigator();

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
