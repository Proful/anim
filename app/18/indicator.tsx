import { View, Text } from "react-native"
import React from "react"

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
} as any

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}))

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 42 }}>❤️</Text>
      <Text
        style={{
          fontFamily: "Menlo",
          marginTop: 10,
          fontWeight: "800",
          fontSize: 16,
        }}
      >
        Expo
      </Text>
      <Text
        style={{
          fontFamily: "Menlo",
          fontStyle: "italic",
          fontSize: 12,
        }}
      >
        (expo.io)
      </Text>
    </View>
  )
}
