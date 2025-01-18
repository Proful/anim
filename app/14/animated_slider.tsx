import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");
export default function AnimatedSlider() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/images/cake.gif")}
        style={{
          width,
          height: width * 1.2,
          resizeMode: "cover",
        }}
      />
    </View>
  );
}
