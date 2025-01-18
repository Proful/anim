import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native"
import React from "react"
import Animated, {
  useSharedValue,
} from "react-native-reanimated"

const { width, height } = Dimensions.get("window")

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
  const scrollX = useSharedValue(0)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsVerticalScrollIndicator={false}
        pagingEnabled // snap at each photo
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1, resizeMode: "cover" }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                ]}
              />
            </View>
          )
        }}
      />
    </View>
  )
}
