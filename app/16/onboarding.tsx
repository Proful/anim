import React, { useState } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { interpolate } from "@shopify/react-native-skia"

const App = () => {
  const [arrowDirection, setArrowDirection] = useState(true)
  const progress = useSharedValue(0)

  const onPress = () => {
    progress.value = withTiming(+arrowDirection, {
      duration: 3000,
    })
    setArrowDirection(!arrowDirection)
  }

  const animatedStyles = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, -90, -180], // scale right side
      // [0, 90, 180], // scale left side
    )
    const translateX = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, 50, 0],
    )
    return {
      transform: [
        {
          // it determines how far the "camera" is from the object,
          // which affects the appearance of depth in the animation
          // A smaller perspective value making nearby
          // parts of the object look larger
          perspective: 200,
        },
        {
          rotateY: `${rotateY}deg`,
        },
        {
          scale: interpolate(
            progress.value,
            [0, 0.5, 1],
            [1, 8, 1],
          ),
        },
        {
          translateX: `${translateX}%`,
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[styles.circle, animatedStyles]}
        >
          <AntDesign
            name="arrowright"
            size={24}
            color="rgba(255,255,255,0.7)"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

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
})

export default App
