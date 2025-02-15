import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import data from "./data"
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  LinearTransition,
} from "react-native-reanimated"
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(-1)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      {data.map(
        ({ bg, color, category, subCategories }, i) => {
          return (
            <TouchableOpacity
              key={category}
              // flexGrow: Allow content to grow irrespective of sibling
              style={{ flexGrow: 1 }}
              activeOpacity={0.9}
              onPress={() => {
                setCurrentIndex(i === currentIndex ? -1 : i)
              }}
            >
              <View
                style={{
                  backgroundColor: bg,
                  flexGrow: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: color,
                    fontSize: 36,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: -2,
                  }}
                >
                  {category}
                </Text>
                <Animated.View
                  layout={LinearTransition.springify()}
                >
                  {i === currentIndex &&
                    subCategories.map((subCategory) => (
                      <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                      >
                        <Text
                          style={{
                            color,
                            fontSize: 20,
                            lineHeight: 20 * 1.5,
                            textAlign: "center",
                          }}
                        >
                          {subCategory}
                        </Text>
                      </Animated.View>
                    ))}
                </Animated.View>
              </View>
            </TouchableOpacity>
          )
        },
      )}
    </View>
  )
}
