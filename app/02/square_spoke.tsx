import { Canvas, Group, Rect } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const { width: sw, height: sh } = Dimensions.get("window");
const c = { x: sw / 2, y: sh / 2 };
const d = sw * 0.7;
const r = d / 2;
const rw = 100;

const n = 6; // number of sides
const ns = 1; // number of steps
const gap = 15;

const DottedSpoke = () => {
  const points = new Array(ns)
    .fill(0)
    .map((_, i) => dottedSpokePositions(r - i * gap));

  return (
    <Canvas style={{ flex: 1 }}>
      {/* Change the origin from top left to center  */}
      <Group transform={[{ translateX: c.x - 50 }, { translateY: c.y - 80 }]}>
        {points.map((ps, i) => (
          <Group key={i}>
            {ps.map((p, j) => (
              <Group
                key={j}
                transform={[
                  { translateX: p[0] + rw / 2 }, // Move origin to the center of the rectangle
                  { translateY: p[1] + rw / 2 },
                  {
                    rotate:
                      j === 1 || j === 4
                        ? (-30 * Math.PI) / 180 // Rotate 45° CCW
                        : j === 2 || j === 5
                          ? (30 * Math.PI) / 180 // Rotate 45° CW
                          : 0, // No rotation
                  },
                  { translateX: -(p[0] + rw / 2) }, // Move origin back
                  { translateY: -(p[1] + rw / 2) },
                ]}
              >
                <Rect x={p[0]} y={p[1]} width={rw} height={rw} />
              </Group>
            ))}
          </Group>
        ))}
      </Group>
    </Canvas>
  );
};

function dottedSpokePositions(r: number) {
  return new Array(n).fill(0).map((_, i) => {
    const theta = (i * 360) / n;
    // console.log(i, theta);

    const x = r * Math.cos((theta * Math.PI) / 180);
    const y = r * Math.sin((theta * Math.PI) / 180);
    return [x, y];
  });
}

export default DottedSpoke;
