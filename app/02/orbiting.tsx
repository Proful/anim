import { useEffect } from "react";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
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

const Orbiting = () => {
  const theta = useSharedValue(0);
  // Deriving x,y separately works
  // convert theta from degree to rad for getting x,y
  // polar => cartesian
  const scx = useDerivedValue(
    () => c.x + r * Math.cos((theta.value * Math.PI) / 180),
  );
  const scy = useDerivedValue(
    () => c.y + r * Math.sin((theta.value * Math.PI) / 180),
  );

  // here scx & scy are not scalar values, they UI thread one
  const sc = { x: scx, y: scy };

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
        <Circle cx={sc.x} cy={sc.y} r={sr} color="rgba(0,0,0,0.6)" />
      </Group>
    </Canvas>
  );
};

export default Orbiting;
