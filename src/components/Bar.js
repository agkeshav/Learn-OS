import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";

const Bar = ({ timeLine, n }) => {
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    const newColorMap = {};
    timeLine.forEach((item) => {
      if (!newColorMap.hasOwnProperty(item)) {
        newColorMap[item] = randomColor();
      }
    });
    setColorMap(newColorMap);
  }, [timeLine]);

  // Group the same processes together
  const groupedTimeLine = timeLine.reduce((groups, item) => {
    if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
      groups.push([item]);
    } else {
      groups[groups.length - 1].push(item);
    }
    return groups;
  }, []);

  const renderItem = ({ item, index }) => {
    const backgroundColor = item[0] === -1 ? "#e0e0e0" : colorMap[item[0]];
    const text = item[0] === -1 ? "Empty" : `P${item[0]}`;
    const count = item.length;

   return (
     <View>
       <View
         style={{
           backgroundColor: backgroundColor,
           width: ((Dimensions.get("screen").width / n ) - 2.3) * item.length,
           height: 40,
           flexDirection: "row",
           justifyContent: "center",
           alignItems: "center",
         }}
       >
         <View
           style={{
             backgroundColor: "#FFF",
             padding: 5,
             borderRadius: 20,
           }}
         >
           <Text style={{ textAlign: "center" }}>{text}</Text>
         </View>
       </View>
       <View
         style={{
           width: ((Dimensions.get("screen").width / n ) - 2.3) * item.length,
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
           borderLeftWidth: 1,
           borderRightWidth: 1,
           borderLeftColor: "#000",
           borderRightColor: "#000",
         }}
       >
         {count > 0 && (
           <>
             <Text style={{ fontSize: 15 }}>&lt;-</Text>
             <Text
               style={{
                 fontSize: 16,
                 fontWeight: "bold",
                 flex: 1,
                 textAlign: "center",
               }}
             >
               {count}
             </Text>
             <Text style={{ fontSize: 15 }}>-&gt;</Text>
           </>
         )}
       </View>
     </View>
   );
    
  };


  return (
    <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
      <FlatList
        data={groupedTimeLine}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({});
