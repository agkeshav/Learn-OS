import { View, Text } from "react-native";
import React from "react";

export default function Spacer({ children }) {
  return <View style={{ margin: 20 }}>{children}</View>;
}
