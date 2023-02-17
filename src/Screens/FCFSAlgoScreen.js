import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { Context as AlgoContext } from "../context/algoContext";
import { Feather } from "@expo/vector-icons";
import Bar from "./../components/Bar";

const FCFSAlgoScreen = () => {
  const [arrTime, setArrTime] = useState(0);
  const [Bursttime, setBursttime] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { addProcess, state, clear, schedule } = useContext(AlgoContext);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#00000040",
          borderRadius: 10,
          margin: 10,
          padding: 20,
        }}
      >
        <Text>Arrival Time : </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            margin: 10,
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 15,
            padding: 5,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setArrTime(arrTime + 1);
            }}
          >
            <Feather name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ padding: 5 }}>{arrTime}</Text>
          <TouchableOpacity
            onPress={() => {
              if (arrTime > 0) {
                setArrTime(arrTime - 1);
              }
            }}
          >
            <Feather name="minus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text>Burst Time : </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            margin: 10,
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 15,
            padding: 5,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
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
              if (Bursttime > 0) {
                setBursttime(Bursttime - 1);
              }
            }}
          >
            <Feather name="minus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: Dimensions.get("window").width * 0.75,
            marginTop: 10,

            // borderColor: "black",
            // borderWidth: 2,
            // marginHorizontal: 10,
          }}
        >
          <Button
            title="Add"
            onPress={() => {
              {
                if (arrTime >= 0 && Bursttime > 0) {
                  setArrTime(arrTime);
                  setBursttime(Bursttime);
                  addProcess(arrTime, Bursttime);
                  setArrTime(0);
                  setBursttime(0);
                }
              }
            }}
          />
          <Button
            title="Clear"
            onPress={() => {
              clear();
              setArrTime(0);
              setBursttime(0);
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
      </View>
      {state.process.length > 0 ? (
        <>
          <Text style={{ marginLeft: 45, fontSize: 20 }}>Processes</Text>
          <View
            style={{
              ...styles.line,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.75,
            }}
          >
            <View style={styles.tableBox}>
              <Text>Id</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>Arrival Time</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>Burst Time</Text>
            </View>
          </View>
          <FlatList
            style={{ alignSelf: "center", flex: 1 }}
            data={state.process}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    ...styles.line,
                    width: Dimensions.get("window").width * 0.75,
                  }}
                >
                  <View style={styles.tableBox}>
                    <Text>{`P${item.id}`}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.arrTime}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.burstTime}</Text>
                  </View>
                </View>
              );
            }}
          />
        </>
      ) : null}

      {state.timeLine.length > 0 && state.showBar ? (
        <Bar timeLine={state.timeLine} n={state.timeLine.length} />
      ) : null}

      {state.scheduledProcess.length > 0 ? (
        <>
          <View
            style={{
              ...styles.line,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.95,
            }}
          >
            <View style={styles.tableBox}>
              <Text>Id</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>AT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>BT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>CT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>TAT</Text>
            </View>
            <View style={styles.tableBox}>
              <Text>WT</Text>
            </View>
          </View>
          <FlatList
            data={state.scheduledProcess}
            style={{ alignSelf: "center", flex: 1 }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    ...styles.line,
                    width: Dimensions.get("window").width * 0.95,
                  }}
                >
                  <View style={styles.tableBox}>
                    <Text>{`P${item.id}`}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.arrTime}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.burstTime}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.ct}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.tat}</Text>
                  </View>
                  <View style={styles.tableBox}>
                    <Text>{item.wt}</Text>
                  </View>
                </View>
              );
            }}
          />
        </>
      ) : null}
    </View>
  );
};

export default FCFSAlgoScreen;

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    alignContent: "center",
    paddingLeft: 1,
    backgroundColor: "lightpink",
  },
});
