import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as CommandsProvider } from "./src/context/commandsContext";

import LearnCommandsScreen from "./src/Screens/LearnCommandsScreen";
import HomeScreen from "./src/Screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const App = () => {
  return (
    <CommandsProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen
            name="Learn Commands"
            component={LearnCommandsScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </CommandsProvider>
  );
};

export default App;
