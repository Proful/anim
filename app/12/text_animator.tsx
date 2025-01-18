import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

export default function App() {
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 8,
        backgroundColor: "#ecf0f1",
      }}
    >
      <TextAnimator
        content={
          "Hope is being able to see that there is light despite all of the darkness."
        }
      />
    </View>
  );
}

type TextAnimatorProps = {
  content: string;
};

const TextAnimator = (props: TextAnimatorProps) => {
  const completedCount = useSharedValue(0);
  const words = props.content.trim().split(" ");
  const opacities = words.map(() => useSharedValue(0));

  useEffect(() => {
    // let completedCount = 0;
    const totalAnimations = words.length;
    // Trigger the animations sequentially
    words.forEach((_, index) => {
      setTimeout(() => {
        opacities[index].value = withTiming(
          1,
          { duration: 500 },
          (isFinished) => {
            if (isFinished) {
              completedCount.value = completedCount.value + 1;

              // Check if all animations have completed
              if (completedCount.value === totalAnimations) {
                console.log("All animations completed", "reset2");
              }
            }
          },
        );
      }, index * 300); // Delay each animation by 500ms
    });
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {words.map((w, i) => {
        const animatedStyles = useAnimatedStyle(() => ({
          opacity: opacities[i].value,
          transform: [{ translateY: opacities[i].value * -15 }],
        }));
        return (
          <Animated.View key={i} style={[animatedStyles]}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "SpaceMono-Regular",
              }}
            >
              {w + " "}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};
