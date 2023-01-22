import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Terminal from './../components/Terminal';

const PlayGroundScreen = () => {
  const navigation = useNavigation();
  return (
    <Terminal/>
  );
};

export default PlayGroundScreen;

const styles = StyleSheet.create({});
