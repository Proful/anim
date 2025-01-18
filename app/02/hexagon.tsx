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
// number of spoke
const n = 6;

const Hexagon = () => {
  const rotation = useSharedValue(0);

  const transform = useDerivedValue(() => {
    {
      /* Change the origin from top left to center  */
    }
    return [
      { translateX: c.x },
      { translateY: c.y },
      { rotate: (rotation.value * Math.PI) / 180 },
    ];
  });

  useEffect(() => {
    rotation.value = withTiming(360, { duration: 3000 });
  }, []);

  const path = hexagonPath();
  return (
    <Canvas style={{ flex: 1 }}>
      {/* Change the origin from top left to center  */}
      <Group transform={transform}>
        <Path
          path={path}
          color="rgba(0,0,0,.4)"
          style="stroke"
          strokeWidth={5}
          strokeCap="round"
          strokeJoin="round"
        />
      </Group>
    </Canvas>
  );
};

function hexagonPath() {
  let path = "M ";
  new Array(n).fill(0).map((_, i) => {
    const x = r * Math.cos((i * (360 / n) * Math.PI) / 180);
    const y = r * Math.sin((i * (360 / n) * Math.PI) / 180);
    console.log("i", i, x, y);
    if (i === 0) {
      path = `M ${x} ${y} `;
    } else {
      path += `L ${x} ${y} `;
    }
  });
  path += "Z";
  return path;
}

export default Hexagon;
