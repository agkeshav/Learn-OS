import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/algoContext";
import { Feather } from "@expo/vector-icons";

const FCFSAlgoScreen = () => {
  const [arrTime, setArrTime] = useState(null);
  const [burstTime, setBurstTime] = useState(null);
  const [entryTime, setEntryTime] = useState(0);
  const [Bursttime, setBursttime] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { addProcess, state, clear, schedule } = useContext(AlgoContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center", 
          // alignItems: "center",
          backgroundColor: "#00000040",
          margin: 10,
          borderRadius: 10,
          padding: 100,
        }}
      >
        <View style={styles.line}>
          <Text>Arrival Time : </Text>
          <TouchableOpacity
            onPress={() => {
              setEntryTime(entryTime + 1);
            }}
          >
            <Feather name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ padding: 5 }}>{entryTime}</Text>
          <TouchableOpacity
            onPress={() => {
              setEntryTime(entryTime - 1);
            }}
          >
            <Feather name="minus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <Text>Burst Time : </Text>
          <TouchableOpacity
            onPress={() => {
              setBursttime(Bursttime + 1);
            }}
          >
            <Feather name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ padding: 5 }}>{Bursttime}</Text>
          <TouchableOpacity
            onPress={() => {
              setBursttime(Bursttime - 1);
            }}
          >
            <Feather name="minus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Button
          title="Add"
          onPress={() => {
            {
              if (entryTime >= 0 && Bursttime) {
                setArrTime(entryTime);
                setBurstTime(Bursttime);
                addProcess(entryTime, Bursttime);
                setArrTime(null);
                setBurstTime(null);
                setEntryTime(0);
                setBursttime(0);
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
      </View>
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

      <FlatList
        data={state.perArr}
        renderItem={({ item }) => {
          const barStyle = ({ item }) =>
            StyleSheet.create({
              bar: {
                height: 50,
                width: (400 * item) / 100,
                backgroundColor: "#f09",
                borderWidth: 2,
                borderColor: "black",
              },
            });
          return (
            <View style={barStyle.bar}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      {/* <View style={styles.bar}></View> */}

      {/* <Button
        title="FCFS"
        onPress={() => {
          navigation.navigate("FCFS Algorithms Screen");
        }}
      /> */}
    </View>
  );
};

export default FCFSAlgoScreen;

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    height: 50,
    width: 100,
    backgroundColor: "#ff09",
  },
});
