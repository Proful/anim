import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  Canvas,
  RadialGradient,
  Circle,
  rect,
  vec,
  Rect,
  Group,
} from "@shopify/react-native-skia";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const sw = Dimensions.get("window").width;
const sh = Dimensions.get("window").height;

const App = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      // console.log(event.contentOffset, sw);
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        onScroll={scrollHandler}
      >
        {products.map((product, i) => {
          const inputRange = [(i - 2) * sw, (i - 1) * sw, i * sw, (i + 1) * sw];

          const outputRangeForScale = [1, 0.4, 1, 0.4];

          const outputRangeForOpacity = [1, 0.2, 1, 0.2];

          const animateStyle = useAnimatedStyle(() => {
            const imgScale = interpolate(
              scrollX.value,
              inputRange,
              outputRangeForScale,
            );

            const imgOpacity = interpolate(
              scrollX.value,
              inputRange,
              outputRangeForOpacity,
            );

            return {
              transform: [{ scale: imgScale }],
              opacity: imgOpacity,
            };
          });

          const animateStyleContainer = useAnimatedStyle(() => {
            const rotate = interpolate(
              scrollX.value,
              inputRange,
              [0, -15, 0, 15],
            );

            const translateX = interpolate(scrollX.value, inputRange, [
              0,
              sw,
              0,
              -sw,
            ]);

            const opacity = interpolate(
              scrollX.value,
              inputRange,
              outputRangeForOpacity,
            );

            return {
              transform: [
                { rotate: `${rotate}deg` },
                { translateX: translateX },
              ],
              opacity: opacity,
            };
          });

          return (
            <Animated.View
              key={product.id}
              style={[styles.card, animateStyleContainer]}
            >
              <Animated.Image
                source={{ uri: product.img }}
                style={[styles.image, animateStyle]}
              />
              <Text style={styles.name}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>${product.price}</Text>

              <Canvas style={styles.canvas}>
                <Group>
                  <Rect x={0} y={0} width={sw} height={sh} color="lightblue">
                    <RadialGradient
                      c={vec(sw / 2, sh / 2)}
                      r={250}
                      colors={["#fff", product.bg]}
                      positions={[0, 1]}
                    />
                  </Rect>
                </Group>
              </Canvas>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: sw,
    height: sh,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: sh * 0.65,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Menlo",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Menlo",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  canvas: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});

export default App;

const products = [
  {
    id: "s02h02e02c02",
    img: "https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/unit-4-wireless-plus-_h76iZed-large.png",
    title: "TMA-2",
    subtitle: "DJ PRESET",
    description:
      "This configuration is based on the original TMA-1 DJ, which is the preferred choice of a range of acclaimed DJs.",
    price: "200€",
    bg: "#16CDC1",
  },
  {
    id: "s74h02e02c74",
    img: "https://images.cdn.europe-west1.gcp.commercetools.com/e566ca9d-a6df-4e08-ab79-02d6d12043a8/Aiaiai_TMA2_DJ%20W_HER-XcPN5mZK-large.png",
    title: "TMA-2",
    subtitle: "ED BANGER EDITION",
    description:
      "This combination provides a very heavy and powerful bass. Recommended for bass lovers and those who like it loud. Limited edition of 300.",
    price: "240€",
    bg: "#bbb",
  },
  {
    id: "s04h71e05c71",
    img: "https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/KeyVisual_3500x3500-vOSLD9gb-large.png",
    title: "TMA-2",
    subtitle: "YOUNG GURU PRESET",
    description:
      "This configuration provides open, vibrant sound with good bass and treble. Wide sound stage and medium isolation.",
    price: "260€",
    bg: "palevioletred",
  },
  {
    id: "s03h03e04c02",
    img: "https://6f836c397566f8a68572-e2de800189bc8603e0746245fbc4e3cb.ssl.cf3.rackcdn.com/unit-4-wireless-plus-_h76iZed-large.png",
    title: "TMA-2",
    subtitle: "STUDIO PRESET",
    description:
      "This configuration provides a warm sound and it is good for extended listening. Great bass and added energy in the lower mid range.",
    price: "225€",
    bg: "#629BF0",
  },
];
