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
import PlayGroundScreen from "./src/Screens/PlayGroundScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FileStructureScreen from "./src/Screens/FileStructureScreen";
import { useState, useContext } from "react";
import DirectoryDetailScreen from "./src/Screens/DirectoryDetailScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const FileStructureFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FileStructure"
        component={FileStructureScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DirectoryDetail"
        component={DirectoryDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const PlayGroundFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlayGround Screen"
        component={PlayGroundScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileStructureFlow"
        component={FileStructureFlow}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerHeader: {
    backgroundColor: "#007aff",
    alignItems: "center",
    paddingLeft: Constants.statusBarHeight * 0.5,
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#007aff",

    width: "100%",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    marginHorizontal: 2,
  },
  drawerLable: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#007aff",

    // width: "100%",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  drawerItemSelected: {
    backgroundColor: "#007aff50",
    // width: "100%",
    flex: 1,
  },
  drawerItemContainer: {
    // width: "100%",
    flex: 1,
  },
  headerIconContainer: {
    marginRight: 15,
  },
});

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
            drawerActiveTintColor: "#007aff",
            drawerItemStyle: styles.drawerItem,
            drawerLabelStyle: styles.drawerLable,
            drawerActiveLabelStyle: styles.drawerItemSelected,
            drawerItemContainerStyle: styles.drawerItemContainer,
          }}
          drawerStyle={styles.drawerContainer}
        >
          <Drawer.Screen
            name="Learn OS"
            component={HomeScreen}
            options={{
              drawerIcon: () => (
                <Entypo
                  name="home"
                  size={24}
                  color="#007aff"
                  style={{ marginLeft: 15 }}
                />
              ),
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
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
                <FontAwesome5
                  name="book-reader"
                  size={24}
                  color="#007aff"
                  style={{ marginLeft: 15 }}
                />
              ),
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
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
                <Ionicons
                  name="terminal"
                  size={24}
                  color="#007aff"
                  style={{ marginLeft: 15 }}
                />
              ),
              headerTintColor: "#fff",
              headerStyle: {
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 20,
                backgroundColor: "#007aff",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
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
