import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Canvas, Circle, Extrapolate, Group } from "@shopify/react-native-skia";
import {
  DerivedValue,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");

const rows = 15;
const cols = 15;
const loc = 50;

export default function Wave() {
  // Create a 2D array filled with 0
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        {grid.map((row, i) => {
          return row.map((_, j) => {
            return <Cell key={i + "-" + j} rowIndex={i} colIndex={j} />;
          });
        })}
      </Group>
    </Canvas>
  );
}

type CellProps = {
  rowIndex: number;
  colIndex: number;
};

function Cell({ rowIndex, colIndex }: CellProps) {
  const r = 50;
  const sr = 5;

  const rowSize = sh / rows;
  const colSize = sw / cols;

  const xOffset = colSize / 2 + colIndex * colSize;
  const yOffseet = rowSize / 2 + rowIndex * rowSize;

  let initial = rowIndex * loc + colIndex * loc;
  initial = interpolate(
    initial,
    [0, rows * loc + cols * loc],
    [0, 1],
    Extrapolate.CLAMP,
  );

  const [x, y, point] = useMovingPoint(r * 1.5, xOffset, yOffseet, initial);

  return (
    <>
      {/* <Line p1={{ x: xOffset, y: yOffseet }} p2={point} /> */}
      <Circle cx={x} cy={y} r={sr} color="rgba(0,0,0,0.9)" />
    </>
  );
}

function useMovingPoint(r: number, xOffset = 0, yOffseet = 0, initial = 0) {
  const progress = useSharedValue(initial);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), 10, true);
    // progress.value = withRepeat(withSpring(1, { duration: 3000 }), 10, false);
  }, []);

  const angle = useDerivedValue(() => {
    const theta = interpolate(
      progress.value,
      [0, 1],
      [0, 2 * Math.PI],
      Extrapolate.CLAMP,
    );

    return theta;
  }, [progress]);

  const x = useDerivedValue(() => xOffset + r * Math.cos(angle.value), [angle]);

  const y = useDerivedValue(
    () => yOffseet + r * Math.sin(angle.value),
    [progress],
  );

  const point = useDerivedValue(() => ({ x: x.value, y: y.value }), [x, y]);

  return [x, y, point] as [
    DerivedValue<number>,
    DerivedValue<number>,
    DerivedValue<{ x: number; y: number }>,
  ];
}
