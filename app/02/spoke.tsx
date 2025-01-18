import { useEffect } from "react";
import {
  Canvas,
  Circle,
  Group,
  Line,
  Path,
  rotate,
} from "@shopify/react-native-skia";
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
const n = 12;

const Spoke = () => {
  const rotation = useSharedValue(0);

  const transform = useDerivedValue(() => {
    return [{ rotate: (rotation.value * Math.PI) / 180 }];
  });

  useEffect(() => {
    rotation.value = withTiming(360, { duration: 3000 });
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      {/* Change the origin from top left to center  */}
      <Group transform={[{ translateX: c.x }, { translateY: c.y }]}>
        <Circle cx={0} cy={0} r={r} color="rgba(255,255,255,0.9)" />

        {new Array(n).fill(0).map((_, i) => {
          return (
            <Group
              key={i}
              // Change the frame of reference by rotating
              transform={[{ rotate: (i * (360 / n) * Math.PI) / 180 }]}
            >
              <Path
                path={`M 0 0 L 0 ${r} Z`}
                color="rgba(0,0,0,.4)"
                style="stroke"
                strokeWidth={5}
                strokeCap="round"
                strokeJoin="round"
                transform={transform}
              />
            </Group>
          );
        })}
      </Group>
    </Canvas>
  );
};

export default Spoke;
