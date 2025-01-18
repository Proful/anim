import React, { useEffect } from "react";
import { Canvas, Group, Rect } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width: sw, height: sh } = Dimensions.get("window");
const rw = 20;
const rh = 10;

export default function Rectie() {
  const translateXA = useSharedValue(0);
  const translateXB = useSharedValue(0);
  const translateXC = useSharedValue(0);
  const translateXD = useSharedValue(0);
  const rotateA = useSharedValue(0);
  const rotateB = useSharedValue(0);
  const rotateC = useSharedValue(0);
  const rotateD = useSharedValue(0);

  // use entire transform array for animation
  // using single properties like translateX doesnot work
  const transform = useDerivedValue(
    () => [
      { translateX: translateXA.value },
      { rotate: rotateA.value },
      { translateX: translateXB.value },
      { rotate: rotateB.value },
      { translateX: translateXC.value },
      { rotate: rotateC.value },
      { translateX: translateXD.value },
      { rotate: rotateD.value },
    ],
    [translateXA, translateXB, rotateA],
  );

  useEffect(() => {
    translateXA.value = withTiming(sw - rw + 20, { duration: 3000 }, () => {
      rotateA.value = withTiming(
        (90 * Math.PI) / 180,
        { duration: 3000 },
        () => {
          translateXB.value = withTiming(
            sh - rh - 45,
            { duration: 3000 },
            () => {
              rotateB.value = withTiming(
                (90 * Math.PI) / 180,
                {
                  duration: 3000,
                },
                () => {
                  translateXC.value = withTiming(
                    sw - rw + 20,
                    { duration: 3000 },
                    () => {
                      rotateC.value = withTiming(
                        (90 * Math.PI) / 180,
                        {
                          duration: 3000,
                        },
                        () => {
                          translateXD.value = withTiming(
                            sh - rh - 45,
                            {
                              duration: 3000,
                            },
                            () => {
                              rotateD.value = withTiming((90 * Math.PI) / 180, {
                                duration: 3000,
                              });
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    });
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={transform}>
        <Rect x={0} y={0} width={rw} height={rh} color={"rgba(0,0,0,0.9)"} />
      </Group>
    </Canvas>
  );
}
