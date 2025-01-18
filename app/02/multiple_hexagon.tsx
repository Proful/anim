import { useEffect } from "react";
import { Canvas, Group, Path } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const d = sw * 0.7;
const r = d / 2;

const n = 6; // number of sides
const ns = 8; // number of steps

const MultipleHexagon = () => {
  const paths = new Array(ns).fill(0).map((_, i) => hexagonPath(r - i * 12));

  return (
    <Canvas style={{ flex: 1 }}>
      {/* Change the origin from top left to center  */}
      <Group
        transform={[
          { translateX: c.x },
          { translateY: c.y },
          { rotate: (30 * Math.PI) / 180 },
        ]}
      >
        {paths.map((p, i) => (
          <Path
            key={i}
            path={p}
            color="rgba(0,0,0,.4)"
            style="stroke"
            strokeWidth={2}
            strokeCap="round"
            strokeJoin="round"
          />
        ))}
      </Group>
    </Canvas>
  );
};

function hexagonPath(r: number) {
  console.log(r);

  let path = "M ";
  new Array(n).fill(0).map((_, i) => {
    const x = r * Math.cos((i * (360 / n) * Math.PI) / 180);
    const y = r * Math.sin((i * (360 / n) * Math.PI) / 180);

    if (i === 0) {
      path = `M ${x} ${y} `;
    } else {
      path += `L ${x} ${y} `;
    }
  });
  path += "Z";
  return path;
}

export default MultipleHexagon;
