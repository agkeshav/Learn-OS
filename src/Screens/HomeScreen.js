import { StyleSheet, Text, View } from "react-native";
import React from "react";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
