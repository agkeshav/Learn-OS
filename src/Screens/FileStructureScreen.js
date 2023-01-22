import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Context as commandContext } from "../context/commandsContext";
import { useNavigation } from "@react-navigation/native";

const FileStructureScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(commandContext);
  var n = state.dirs.concat(state.files).length;
  if (n > 0) {
    return (
      <View>
        <FlatList
          data={state.dirs}
          keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DirectoryDetail", { name: item.name });
                }}
              >
                <View style={styles.rowContainer}>
                  <Feather
                    name="folder"
                    size={24}
                    color="black"
                    style={{ marginHorizontal: 5 }}
                  />
                  <Text style={styles.textStyle}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={state.files}
          keyExtractor={(data) => `${Math.random(1, 100) * data.id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.rowContainer}>
                  <Feather
                    name="file"
                    size={24}
                    color="black"
                    style={{ marginHorizontal: 5 }}
                  />
                  <Text style={styles.textStyle}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Text style={{ color: "grey", fontSize: 16 }}>
          Files/Folders are not generated yet!
        </Text>
      </View>
    );
  }
};

export default FileStructureScreen;

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: 1,
    backgroundColor: "white",
    paddingVertical: 7,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    // justifyContent:'center'
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 10,
  },
});
