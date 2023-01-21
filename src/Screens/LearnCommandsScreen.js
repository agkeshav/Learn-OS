import { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { Context } from "../context/commandsContext";

const LearnCommandsScreen = () => {
  const { state, execute } = useContext(Context);
  const [command, setCommand] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.terminalContainer}>
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
        {state.showList ? (
          <FlatList
            data={state.list}
            keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
            renderItem={({ item }) => {
              return (
                <Text
                  style={
                    item.type == "dir" ? { color: "blue" } : { color: "green" }
                  }
                >
                  {item.name}
                </Text>
              );
            }}
          />
        ) : null}

        {state.showCurrentDir ? <Text>{state.currentDir}</Text> : null}
      </View>
      {state.errorMsg ? (
        <Text style={{ color: "red" }}>{state.errorMsg}</Text>
      ) : null}
      {state.message ? (
        <Text style={{ color: "grey" }}>{state.message}</Text>
      ) : null}
    </View>
  );
};

export default LearnCommandsScreen;

const styles = StyleSheet.create({
  terminalContainer: {
    height: Dimensions.get("window").height * 0.3,
    // backgroundColor:'rgba(0,0,0,1)',
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
  },
  input: {
    borderColor: "red",
    borderWidth: 1,
    margin: 2,
  },
});
