import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/algoContext";

const FCFSAlgoScreen = () => {
  const [arrTime, setArrTime] = useState(null);
  const [burstTime, setBurstTime] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { addProcess, state, clear, schedule } = useContext(AlgoContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}
        value={arrTime}
        onChangeText={(val) => setArrTime(val)}
      />
      <TextInput
        style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}
        value={burstTime}
        onChangeText={(val) => setBurstTime(val)}
      />
      <Button
        title="Add"
        onPress={() => {
          {
            if (arrTime && burstTime) {
              setArrTime(arrTime);
              setBurstTime(burstTime);
              addProcess(arrTime, burstTime);
              setArrTime(null);
              setBurstTime(null);
            }
          }
        }}
      />
      <Button
        title="Clear"
        onPress={() => {
          clear();
          setRefresh(!refresh);
        }}
      />
      <Button
        title="Schedule"
        onPress={() => {
          schedule();
          setRefresh(!refresh);
        }}
      />

      <FlatList
        data={state.process}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.arrTime} {item.burstTime}
            </Text>
          );
        }}
      />
      <FlatList
        data={state.scheduledProcess}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.arrTime} || {item.burstTime} || {item.compTime} ||{" "}
              {item.turnArrTime} || {item.waitingTime}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default FCFSAlgoScreen;

const styles = StyleSheet.create({});
