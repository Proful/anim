import { View, Text, Dimensions } from "react-native";

import {
  Canvas,
  Circle,
  Group,
  Line,
  Path,
  Skia,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const r = (sw / 2) * 0.6;

const r1 = r * 0.9;
const r2 = r * 0.6;
const r3 = r * 0.5;

const sr = 5;

export default function Clock() {
  const { h, m, s } = getCurrentTime();
  const { hourDegrees, minuteDegrees, secondDegrees } = convertToClockDegrees(
    h,
    m,
    s,
  );

  const { x: x1, y: y1, p: p1 } = useTheta(r1, 60, secondDegrees);
  const { x: x2, y: y2, p: p2 } = useTheta(r2, 60 * 60, minuteDegrees);
  const { x: x3, y: y3, p: p3 } = useTheta(r3, 60 * 60 * 60, hourDegrees);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group
        transform={[
          { translateX: c.x },
          { translateY: c.y },
          { rotate: (-90 * Math.PI) / 180 },
        ]}
      >
        <Circle cx={0} cy={0} r={r} color={"rgba(255,255,255,0.8)"} />

        <Line p1={{ x: 0, y: 0 }} p2={p1} color={"rgba(20,30,40,0.8)"} />
        <Circle cx={x1} cy={y1} r={sr} color={"rgba(20,30,40,0.8)"} />

        <Line p1={{ x: 0, y: 0 }} p2={p2} color={"rgba(100,200,230,0.8)"} />
        <Circle cx={x2} cy={y2} r={sr} color={"rgba(100,200,230,0.8)"} />

        <Line p1={{ x: 0, y: 0 }} p2={p3} color={"rgba(220,20,150,0.8)"} />
        <Circle cx={x3} cy={y3} r={sr} color={"rgba(220,20,150,0.8)"} />
      </Group>
    </Canvas>
  );
}

function useTheta(radius: number, sec: number, initial: number) {
  const theta = useSharedValue(initial);
  useEffect(() => {
    theta.value = withRepeat(
      withTiming(360, { duration: sec * 1000 }),
      10,
      false,
    );
  }, []);
  const x = useDerivedValue(
    () => radius * Math.cos((theta.value * Math.PI) / 180),
  );
  const y = useDerivedValue(
    () => radius * Math.sin((theta.value * Math.PI) / 180),
  );
  const p = useDerivedValue(() => ({ x: x.value, y: y.value }));

  return { x: x, y: y, p: p };
}

function getCurrentTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes(); // 0-59
  const s = now.getSeconds(); // 0-59

  return { h, m, s };
}
function convertToClockDegrees(
  hours: number,
  minutes: number,
  seconds: number,
) {
  // Normalize hours to 12-hour format
  hours = hours % 12;

  // Calculate degrees
  const hourDegrees = hours * 30 + minutes * 0.5; // 30 degrees per hour + 0.5 degrees per minute
  const minuteDegrees = minutes * 6; // 6 degrees per minute
  const secondDegrees = seconds * 6; // 6 degrees per second

  return { hourDegrees, minuteDegrees, secondDegrees };
}
