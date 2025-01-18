import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Canvas, Circle, Group, Path, Skia } from "@shopify/react-native-skia";
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const r = (sw / 2) * 0.6;

const sr = 15;
const n = 6;
const sp = 5;
const stw = 5;

export default function FireyBall() {
  const arcs = new Array(n).fill(0).map((_, i) => {
    const deg = useSharedValue(0);
    deg.value = withRepeat(
      withTiming(180, { duration: 1000 / (1 - i * 0.15) }),
      10,
      true,
    );

    const animatedPath = useDerivedValue(() => {
      // console.log(i, "-->", deg.value);

      const theta = deg.value > 180 ? 180 : deg.value;
      const startAngle = 0 * (Math.PI / 180); // Top position
      const endAngle = theta * (Math.PI / 180); // Right position

      const r1 = r - r * 0.1 * i - sp;
      // Calculate the start and end points
      const startPoint = {
        x: r1 * Math.cos(startAngle),
        y: r1 * Math.sin(startAngle),
      };
      const endPoint = {
        x: r1 * Math.cos(endAngle),
        y: r1 * Math.sin(endAngle),
      };

      const largeArcFlag = theta < 180 ? 0 : 1;
      // Return the SVG path string for the arc
      return `M ${startPoint.x} ${startPoint.y} A ${r1} ${r1} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
    }, [deg.value]);

    const animatedPath1 = useDerivedValue(() => {
      // const theta = deg.value > 180 ? 180 : deg.value;
      const theta = deg.value > 180 ? 180 : deg.value;
      const startAngle = 180 * (Math.PI / 180); // Top position
      const endAngle = (180 + theta) * (Math.PI / 180); // Right position

      const r1 = r - r * 0.1 * i - sp;
      // Calculate the start and end points
      const startPoint = {
        x: r1 * Math.cos(startAngle),
        y: r1 * Math.sin(startAngle),
      };
      const endPoint = {
        x: r1 * Math.cos(endAngle),
        y: r1 * Math.sin(endAngle),
      };

      const largeArcFlag = theta < 180 ? 0 : 1;
      // Return the SVG path string for the arc
      return `M ${startPoint.x} ${startPoint.y} A ${r1} ${r1} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
    }, []);

    return { path1: animatedPath, path2: animatedPath1 };
  });

  return (
    <Canvas style={{ flex: 1, backgroundColor: "rgb(19,19,19)" }}>
      <Group transform={[{ translateX: c.x }, { translateY: c.y }]}>
        {arcs.map((ar, i) => (
          <Group key={i}>
            {ar.path1.value && (
              <Path
                path={ar.path1 as any}
                color={`rgba(200,${120 * (i / n)},0,1)`}
                style="stroke"
                strokeWidth={stw}
                strokeCap="round"
                strokeJoin="round"
              />
            )}
            {ar.path2.value && (
              <Path
                path={ar.path2 as any}
                color={`rgba(200,${120 * (i / n)},0,1)`}
                style="stroke"
                strokeWidth={stw}
                strokeCap="round"
                strokeJoin="round"
              />
            )}
          </Group>
        ))}
      </Group>
    </Canvas>
  );
}

function arc(
  cx: number,
  cy: number,
  w: number,
  h: number,
  start: number,
  stop: number,
) {
  const startAngle = start * (Math.PI / 180); // Top position
  const endAngle = stop * (Math.PI / 180); // Right position

  // Calculate the start and end points
  const startPoint = {
    x: cx + w * Math.cos(startAngle),
    y: cy + h * Math.sin(startAngle),
  };
  const endPoint = {
    x: cx + w * Math.cos(endAngle),
    y: cy + h * Math.sin(endAngle),
  };

  const largeArcFlag = stop < 180 ? 0 : 1;
  // Return the SVG path string for the arc
  return `M ${startPoint.x} ${startPoint.y} A ${w} ${h} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
}

function useProgress(r: number, theta: number, velocity: number) {
  const progress = useSharedValue(0);
  const rad = useDerivedValue(
    () => interpolate(progress.value, [0, 1], [0, 2 * Math.PI]),
    [progress.value],
  );

  const deg = useDerivedValue(
    () => interpolate(progress.value, [0, 1 * velocity], [0, 180]),
    [progress.value],
  );

  const x = useDerivedValue(() => r * Math.cos(theta + rad.value), [rad.value]);
  const y = useDerivedValue(() => r * Math.sin(theta + rad.value), [rad.value]);
  const point = useDerivedValue(() => ({ x: x.value, y: y.value }), [x, y]);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), 8, true);
    // progress.value = withRepeat(withDecay({ velocity: velocity }), 8, true);

    return () => {
      progress.value = 0;
    };
  }, []);

  return { progress, rad, deg, x, y, point };
}
