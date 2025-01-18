import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";

import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  Canvas,
  Circle,
  Group,
  Line,
  Path,
  Skia,
} from "@shopify/react-native-skia";

const { width: sw, height: sh } = Dimensions.get("window");
const c1 = { x: sw / 2, y: sh / 2 };
const r1 = (sw / 2) * 0.8;
const r2 = r1 / 2;
const c2 = { x: r2, y: 0 };

const n1 = 48;
const n2 = 24;

export default function Oscillating() {
  const rot = useSharedValue(0);

  useEffect(() => {
    rot.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 5000, easing: Easing.linear }),
      10,
      false,
    );
  }, []);

  const points1 = new Array(n1).fill(0).map((_, i) => {
    const theta = (i * (2 * Math.PI)) / n1;

    const x = r1 * Math.cos(theta);
    const y = r1 * Math.sin(theta);

    return { x, y };
  });

  const points2 = new Array(n2).fill(0).map((_, i) => {
    const theta = (i * (2 * Math.PI)) / n2;

    const x = c2.x + r2 * Math.cos(theta);
    const y = c2.y + r2 * Math.sin(theta);

    return { x, y };
  });

  const transform = useDerivedValue(() => {
    return [{ rotate: rot.value }];
  }, []);

  return (
    <Canvas style={{ flex: 1, backgroundColor: "#41899e" }}>
      <Group transform={[{ translateX: c1.x }, { translateY: c1.y }]}>
        <Circle
          cx={0}
          cy={0}
          r={r1}
          style={"stroke"}
          color={"#71b2c9"}
          strokeWidth={2}
        />
        {points1.map((p, i) => (
          <Line
            key={i}
            p1={{ x: 0, y: 0 }}
            p2={p}
            color={"#6cb0c4"}
            strokeWidth={2}
          />
        ))}
        <Group transform={transform}>
          {points2.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={5} color={"#d7d7da"} />
          ))}
        </Group>
      </Group>
    </Canvas>
  );
}
