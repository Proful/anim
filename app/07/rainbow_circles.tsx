import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Canvas, Circle, Group, Line } from "@shopify/react-native-skia";
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
// const r = 120;
const sfr = 40;
const n = 12;

const colors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"];
export default function RainbowCircles() {
  const progress = useSharedValue(0);

  const br = useDerivedValue(() => {
    const r = interpolate(progress.value, [0, 1], [0, 120]);
    return r;
  });

  const sr = useDerivedValue(() => {
    // const r = interpolate(progress.value, [0, 1], [0, 120]);
    const r = br.value;
    return Math.sqrt(
      r * r + r * r - 2 * r * r * Math.cos((30 * 2 * Math.PI) / 360),
    );
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), 10, true);
  }, [progress]);

  const points = new Array(n).fill(0).map((_, i) => {
    const x = useDerivedValue(
      () => br.value * Math.cos((((i * 360) / n) * 2 * Math.PI) / 360),
    );
    const y = useDerivedValue(
      () => br.value * Math.sin((((i * 360) / n) * 2 * Math.PI) / 360),
    );

    return {
      x,
      y,
    };
  });

  return (
    <Canvas style={{ flex: 1 }}>
      <Group
        transform={[{ translateX: c.x }, { translateY: c.y }]}
        blendMode={"difference"}
      >
        {/* <Circle cx={0} cy={0} r={r} color={"rgba(255,255,255,0.9)"} /> */}
        {points.map((point, i) => (
          <Group key={i}>
            {/* <Line */}
            {/*   p1={{ x: 0, y: 0 }} */}
            {/*   p2={{ x: point.x.value, y: point.y.value }} */}
            {/*   strokeWidth={5} */}
            {/*   color={"rgba(0,0,0,0.4)"} */}
            {/* /> */}
            <Circle cx={point.x} cy={point.y} r={sfr} color={colors[i % 3]} />
          </Group>
        ))}
      </Group>
    </Canvas>
  );
}
