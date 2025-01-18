import { View, Text, Dimensions } from "react-native";
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
const r1 = (sw / 2) * 0.7;
const r2 = (sw / 2) * 0.4;
const sr1 = 5;
const sr2 = 5;

const n1 = 15;
const n2 = 5;
export default function MovingStars() {
  // const { rad } = useProgress(0, 0);

  const points1 = new Array(n1).fill(0).map((_, i) => {
    const theta = ((2 * Math.PI) / n1) * i;
    const x = r1 * Math.cos(theta);
    const y = r1 * Math.sin(theta);
    const sc = { x, y };
    return sc;
  });

  const points2 = new Array(n2).fill(0).map((_, i) => {
    const theta = ((2 * Math.PI) / n2) * i;
    const { x, y, point } = useProgress(r2, theta);
    return { x, y, point };
  });

  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={[{ translateX: c.x }, { translateY: c.y }]}>
        {/* <Circle cx={0} cy={0} r={r1} color="rgba(255,255,255,0.9)" /> */}
        {/* {points1.map((p, i) => { */}
        {/*   return ( */}
        {/*     <Circle key={i} cx={p.x} cy={p.y} r={sr1} color="rgba(0,0,0,0.6)" /> */}
        {/*   ); */}
        {/* })} */}
        {/* {points2.map((p, i) => { */}
        {/*   return ( */}
        {/*     <Circle key={i} cx={p.x} cy={p.y} r={sr2} color="rgba(0,0,0,0.6)" /> */}
        {/*   ); */}
        {/* })} */}
        {points1.map((p1, i) => {
          return points2.map((p2, j) => {
            return (
              <Line key={i + "-" + j} p1={{ x: p1.x, y: p1.y }} p2={p2.point} />
            );
          });
        })}
      </Group>
    </Canvas>
  );
}

function useProgress(r: number, theta: number) {
  const progress = useSharedValue(0);
  const rad = useDerivedValue(
    () => interpolate(progress.value, [0, 1], [0, 2 * Math.PI]),
    [progress.value],
  );

  const x = useDerivedValue(() => r * Math.cos(theta + rad.value), [rad.value]);
  const y = useDerivedValue(() => r * Math.sin(theta + rad.value), [rad.value]);
  const point = useDerivedValue(() => ({ x: x.value, y: y.value }), [x, y]);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), 10, false);

    return () => {
      progress.value = 0;
    };
  }, []);

  return { progress, rad, x, y, point };
}
