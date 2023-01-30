import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Context as AlgoContext } from "../context/algoContext";
import { useNavigation } from "@react-navigation/native";
import Spacer from "./../components/Spacer";

const SchedulingAlgorithmsScreen = () => {
  const navigation = useNavigation();
  const [arrTime, setArrTime] = useState(0);
  const [burstTime, setBurstTime] = useState(0);
  const { addProcess, state } = useContext(AlgoContext);
  return (
    <View style={{ flex: 1 }}>
      <Spacer>
        <Button
          title="FCFS"
          onPress={() => {
            navigation.navigate("FCFS Algorithms Screen");
          }}
        />
      </Spacer>
    </View>
  );
};

export default SchedulingAlgorithmsScreen;

const styles = StyleSheet.create({});
