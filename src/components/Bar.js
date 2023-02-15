import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const Bar = ({ timeLine, n }) => {
  const w = Dimensions.get("screen").width;

  return (
    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
      <FlatList
        data={timeLine}
        horizontal
        renderItem={({ item }) => {
          if (item < 0) {
            return (
              <View
                style={{
                  backgroundColor: "cyan",
                  width: Dimensions.get("screen").width / n,
                }}
              ></View>
            );
          } else {
            return (
              <View
                style={{
                  backgroundColor: "green",
                  width: Dimensions.get("screen").width / n,
                }}
              >
                <Text>{`P${item}`}</Text>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({});
