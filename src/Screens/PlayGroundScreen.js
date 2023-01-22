import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PlayGroundScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Here we will put the terminal</Text>
    </View>
  );
};

export default PlayGroundScreen;

const styles = StyleSheet.create({});
