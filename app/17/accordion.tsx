import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import data from "./data"

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {data.map(
        ({ bg, color, category, subCategories }) => {
          return (
            <TouchableOpacity key={category}>
              <View style={{ backgroundColor: bg }}>
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
              </View>
            </TouchableOpacity>
          )
        },
      )}
    </View>
  )
}
