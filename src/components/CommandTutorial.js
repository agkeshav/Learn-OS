import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const CommandTutorial = ({ command, content, argument, executable }) => {
  if (executable) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainerPro}>
          <View style={styles.headerContainer}>
            <Text style={styles.Heading}>{command}</Text>
            <Text style={styles.argument}>{argument}</Text>
          </View>
          <MaterialIcons name="event-available" size={24} color="green" />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainerPro}>
          <View style={styles.headerContainer}>
            <Text style={styles.Heading}>{command}</Text>
            <Text style={styles.argument}>{argument}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  }
};

export default CommandTutorial;

const styles = StyleSheet.create({
  container: {
    margin: 2,
    padding: 5,
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  headerContainerPro: {
    padding: 10,
    backgroundColor: "#007aff50",
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: "row",

    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    paddingLeft: 8,
    backgroundColor: "#e5e5e580",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Heading: {
    fontSize: 30,
  },
  content: {
    fontSize: 16,
  },
  argument: {
    fontSize: 25,
    marginLeft: 5,
    color: "grey",
  },
});
