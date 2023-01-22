import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/commandsContext";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DirectoryDetailScreen = (props) => {
  const name = props.route.params.name;
  const { state, execute } = useContext(Context);
  var dir_id;
  var i = state.dirs.length;
  while (i--) {
    if (state.dirs[i].name == name) {
      dir_id = i;
    }
  }
  var n = state.dirs[dir_id].files.length;
  if (n > 0) {
    return (
      <View>
        <FlatList
          data={state.dirs[dir_id].files}
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
          {`Files are not generated yet in ${name}`}
        </Text>
      </View>
    );
  }
};

export default DirectoryDetailScreen;

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
