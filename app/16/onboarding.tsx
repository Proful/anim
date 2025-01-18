import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { interpolate } from "@shopify/react-native-skia";

const App = () => {
  const progress = useSharedValue(0);

  const onPress = () => {
    progress.value = withTiming(1, { duration: 3000 });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(progress.value, [0, 0.5, 1], [0, 90, 180])}deg`,
        },
        {
          scale: interpolate(progress.value, [0, 0.5, 1], [1, 8, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[styles.circle, animatedStyles]}>
          <AntDesign
            name="arrowright"
            size={24}
            color="rgba(255,255,255,0.7)"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "goldenrod",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
