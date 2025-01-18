import { useEffect } from "react";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const Circular = () => {
  const size = 256;
  const r = useSharedValue(0);
  // As r increases, c decreases, creating a vertical motion for the circle.
  // The circle’s radius (r) and vertical position (cy) are linked:
  // As r grows (animation), c decreases (c = size - r), moving the circle upward.
  // As r shrinks (repeats), c increases, moving the circle downward.
  const c = useDerivedValue(() => size - r.value);
  useEffect(() => {
    // only fired once
    // r = 0 -> size * 0.33
    // in emulator run, sometime r starts with size * 0.33 (no animation)
    // r.value = withSpring(size * 0.33);
    r.value = withRepeat(withTiming(size * 0.33, { duration: 1000 }), -1);

    return () => {
      console.log("cleanup");

      r.value = 0;
    };
  }, [r, size]);
  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={c} cy={r} r={r} color="magenta" />
        {/*
         * cx = Horizontal position fixed at the center of the canvas (size / 2).
         * cy = Vertical position animated with c
         *  r = Radius animated with r
         */}
        <Circle cx={size / 2} cy={c} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};

export default Circular;
