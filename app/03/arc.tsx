import { useEffect, useState } from "react";
import { Canvas, Circle, Group, Path, Skia } from "@shopify/react-native-skia";
import {
  cancelAnimation,
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const r = (sw / 2) * 0.7;
const sr = 15;

// start
const startx = c.x + r * Math.cos((0 * Math.PI) / 180);
const starty = c.y + r * Math.sin((0 * Math.PI) / 180);

//end
const endx = c.x + r * Math.cos((-90 * Math.PI) / 180);
const endy = c.y + r * Math.sin((-90 * Math.PI) / 180);

type Point = {
  x: number;
  y: number;
};

const MovingArc = () => {
  const theta = useSharedValue(0);

  const animatedPath = useDerivedValue(() => {
    // Rotate the arc's start and end points using theta
    const startAngle = (90 + theta.value) * (Math.PI / 180); // Top position
    const endAngle = (0 + theta.value) * (Math.PI / 180); // Right position

    // Calculate the start and end points
    const start = {
      x: c.x + r * Math.cos(startAngle),
      y: c.y + r * Math.sin(startAngle),
    };
    const end = {
      x: c.x + r * Math.cos(endAngle),
      y: c.y + r * Math.sin(endAngle),
    };

    // Return the SVG path string for the arc
    return `M ${start.x} ${start.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`;
  });

  useEffect(() => {
    theta.value = 0; // Reset to start
    theta.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1, // Infinite
      false, // Don't reverse
    );
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        <Circle cx={c.x} cy={c.y} r={r} color="rgba(255,255,255,0.9)" />
        <Path
          path={animatedPath}
          color="rgba(0,0,0,.9)"
          style="stroke"
          strokeWidth={15}
          strokeCap="round"
          strokeJoin="round"
        />
      </Group>
    </Canvas>
  );
};

export default MovingArc;
