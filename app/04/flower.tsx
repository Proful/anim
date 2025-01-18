import { useEffect } from "react";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
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
const { x: centerX, y: centerY } = c;
const r = (sw / 2) * 0.4;

const petalRadius = r;
const maxDistance = 60;

const n = 6;
const Flower = () => {
  const progress = useSharedValue(0);
  // Start animation when component mounts
  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withSpring(1, { duration: 2000 }),
      10, // Infinite
      true, // Don't reverse
    );
    return () => {
      progress.value = 0;
    };
  }, []);

  const petals = Array.from({ length: n }, (_, i) => {
    const angle = (i * (360 / n) * Math.PI) / 180;

    // Create separate derived values for x and y
    const x = useDerivedValue(() => {
      return centerX + maxDistance * progress.value * Math.cos(angle);
    }, []);

    const y = useDerivedValue(() => {
      return centerY + maxDistance * progress.value * Math.sin(angle);
    }, []);

    return {
      x,
      y,
      color: generateRandomColor(i),
    };
  });

  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        {/* Draw center circle 
        <Circle
          cx={centerX}
          cy={centerY}
          r={petalRadius}
          color="rgba(255, 182, 193, 0.9)"
        />*/}
        {petals.map((petal, index) => (
          <Circle
            key={index}
            cx={petal.x}
            cy={petal.y}
            r={petalRadius}
            color={petal.color}
          />
        ))}
      </Group>
    </Canvas>
  );
};
function generateRandomColor(index: number) {
  // Randomize the hue between 0 and 360
  const hue = Math.floor(Math.random() * 360);
  // Keep saturation and lightness values constant for consistency
  const saturation = 70; // in percentage
  const lightness = 50; // in percentage
  const alpha = 0.8 - index * 0.1; // Adjust alpha based on the index

  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}
export default Flower;
