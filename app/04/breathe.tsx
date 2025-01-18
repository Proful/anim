import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const r = (sw / 2) * 0.4;

const n = 6;
export default function Breath() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3500 }), 15, true);
  }, []);

  const animatedRadius = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [r * 0.6, r]),
  );

  const animatedColor = useDerivedValue(() => {
    const v = interpolate(progress.value, [0, 1], [0.3, 0.7]);
    return `rgba(0, 0, 0, ${v})`;
  });

  const points = new Array(n).fill(0).map((_, i) => {
    const theta = (((i * 360) / n) * Math.PI) / 180;
    return [r * Math.cos(theta), r * Math.sin(theta)];
  });

  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={[{ translateX: c.x }, { translateY: c.y }]}>
        {points.map((p, i) => {
          return (
            <Circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={animatedRadius}
              color={animatedColor}
            />
          );
        })}
      </Group>
    </Canvas>
  );
}
