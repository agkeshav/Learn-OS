import { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Context } from "../context/commandsContext";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
const Terminal = () => {
  const { state, execute } = useContext(Context);
  const [command, setCommand] = useState("");

  const [loaded] = useFonts({
    Linux: require("../../assets/fonts/VT323-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  // console.log(state)
  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "#000", flexDirection: "column", flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View
          style={{ backgroundColor: "#000", flexDirection: "column", flex: 1 }}
        >
          <View style={styles.terminalContainer}>
            {state.showIO ? (
              <FlatList
                data={state.io}
                keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
                renderItem={({ item }) => {
                  return (
                    <>
                      <View style={styles.line}>
                        <Text style={styles.dir}>{item.currentDir}:$</Text>
                        <Text style={styles.text}> {item.input}</Text>
                      </View>

                      {item.outputError ? (
                        <View style={styles.line}>
                          <MaterialIcons
                            name="error-outline"
                            size={20}
                            color="red"
                          />
                          <Text style={styles.error}> {item.outputError}</Text>
                        </View>
                      ) : null}
                      {state.showCurrentDir ? (
                        <Text style={styles.text}>{item.currentDir}</Text>
                      ) : null}
                      {item.showList ? (
                        <FlatList
                          data={item.outputList}
                          keyExtractor={(data) =>
                            `${Math.random(1, 100) * data.id}`
                          }
                          renderItem={({ item }) => {
                            return (
                              <>
                                {item.type == "dir" ? (
                                  <View style={styles.line}>
                                    <Feather
                                      name="folder"
                                      size={20}
                                      color="cyan"
                                    />
                                    <Text> </Text>
                                    <Text
                                      style={{
                                        color: "cyan",
                                        fontFamily: "Linux",
                                        fontSize: 20,
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  </View>
                                ) : (
                                  <View style={styles.line}>
                                    <Feather
                                      name="file"
                                      size={20}
                                      color="yellow"
                                    />
                                    <Text> </Text>

                                    <Text
                                      style={{
                                        color: "yellow",
                                        fontFamily: "Linux",
                                        fontSize: 20,
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  </View>
                                )}
                              </>
                            );
                          }}
                        />
                      ) : null}
                    </>
                  );
                }}
              />
            ) : null}
            <View style={styles.line}>
              <Text style={styles.dir}>
                {state.cDir[state.cDir.length - 1]}:$
              </Text>

              <TextInput
                style={styles.input}
                value={command}
                onChangeText={(newvalue) => setCommand(newvalue)}
                onEndEditing={() => {
                  setCommand(command);
                  execute(command);
                  setCommand("");
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// just want to see

const styles = StyleSheet.create({
  terminalContainer: {
    // height: Dimensions.get("window").height * 0.5,
    backgroundColor: "#000",
    // borderWidth: 2,
    // borderColor: "black",
    margin: 0,
    paddingHorizontal: 5,
  },
  input: {
    color: "white",
    fontFamily: "Linux",
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    backgroundColor: "#000",
    fontSize: 20,
    paddingHorizontal: 5,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "Linux",
    fontSize: 20,
  },
  dir: {
    color: "green",
    fontFamily: "Linux",
    fontSize: 20,
  },
  error: {
    color: "red",
    fontFamily: "Linux",
    fontSize: 20,
  },
  listItem: {
    color: "white",
    fontFamily: "Linux",
  },
});

export default Terminal;
