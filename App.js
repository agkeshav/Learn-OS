// This is a cokilsdulhfkdsa
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Provider as CommandsProvider,
  Context as commandContext,
} from "./src/context/commandsContext";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import LearnCommandsScreen from "./src/Screens/LearnCommandsScreen";
import HomeScreen from "./src/Screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// const DrawerStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Learn Commands" component={LearnCommandsScreen} />
//       <Stack.Screen name="Accounts" component={Logout} />
//     </Stack.Navigator>
//   );
// };

const App = () => {
  return (
    <CommandsProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <View style={styles.drawerContainer}>
              <View style={styles.drawerHeader}>
                <View style={styles.headerIconContainer}>
                  <Entypo name="network" size={50} color="white" />
                </View>

                <Text style={styles.drawerHeaderText}>Learn OS</Text>
              </View>
              <DrawerContent {...props} />
            </View>
          )}
          screenOptions={{
            drawerActiveBackgroundColor: "#007aff50",
            drawerActiveTintColor: "#fff",
            drawerItemStyle: styles.drawerItem,
            drawerLabelStyle: styles.drawerItem,
            drawerActiveLabelStyle: styles.drawerItemSelected,
            drawerItemContainerStyle: styles.drawerItemContainer,
          }}
          drawerStyle={styles.drawerContainer}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: () => (
                <Entypo name="home" size={24} color="#007aff" />
              ),
              headerStyle: {
                backgroundColor: "white",
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 20,
                backgroundColor: "#007aff",
              },
            }}
          />
          <Drawer.Screen
            name="Learn Commands"
            component={LearnCommandsScreen}
            options={{
              drawerIcon: () => (
                <FontAwesome5 name="book-reader" size={24} color="#007aff" />
              ),
              headerStyle: {
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 20,
                backgroundColor: "#007aff",
              },
            }}
          />
          <Drawer.Screen
            name="Play Ground"
            options={{
              drawerIcon: () => (
                <Ionicons name="terminal" size={24} color="#007aff" />
              ),
              headerStyle: {
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 20,
                backgroundColor: "#007aff",
              },
              headerRight: () => {
                const [fileIcon, setFileIcon] = useState(true);
                const navigation = useNavigation();
                const { refresh } = useContext(commandContext);
                {
                  if (fileIcon) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("FileStructureFlow");
                          refresh();
                          setFileIcon(!fileIcon);
                        }}
                      >
                        <View style={{ padding: 10 }}>
                          <Entypo name="folder" size={25} color="#ffffff" />
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("PlayGround Screen");
                          setFileIcon(!fileIcon);
                        }}
                      >
                        <View style={{ padding: 10 }}>
                          <Ionicons name="terminal" size={25} color="#ffffff" />
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }
              },
            }}
            component={PlayGroundFlow}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </CommandsProvider>
  );
};

export default App;
