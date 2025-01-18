import "react-native-reanimated";
import "react-native-gesture-handler";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { AnimatePresence, MotiView } from "moti";

export default function App() {
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 8,
        backgroundColor: "#ecf0f1",
      }}
    >
      <TextAnimator
        content={
          "Hope is being able to see that there is light despite all of the darkness."
        }
      />
    </View>
  );
}

type TextAnimatorProps = {
  content: string;
};

const TextAnimator = (props: TextAnimatorProps) => {
  const [reverse, setReverse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const words = props.content.trim().split(" ");

  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setReverse(true); // Start reverse animation after some delay
      }, 1000); // Add a small delay before reverse animation starts

      return () => clearTimeout(timer);
    }
  }, [animationComplete]);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 55,
      }}
    >
      {words.map((w, i) => {
        return (
          <MotiView
            key={i}
            from={{
              opacity: reverse ? 1 : 0, // Start with 1 if reverse, else 0
            }}
            animate={{
              opacity: reverse ? 0 : 1,
            }} // Reverse opacity if reverse is true
            transition={{
              delay: i * 300, // Apply staggered delay
              duration: 3500, // Duration of each animation
            }}
            onDidAnimate={(key, finished) => {
              if (key === "opacity" && finished) {
                // Track when all animations are complete (end of forward animation)
                if (!reverse && i === words.length - 1) {
                  setAnimationComplete(true); // Set to trigger reverse animation
                }
              }
            }}
          >
            {/* <MotiView */}
            {/*   key={i} */}
            {/*   from={{ opacity: reverse ? 1 : 0, translateY: reverse ? 0 : 0 }} */}
            {/*   animate={{ */}
            {/*     opacity: reverse ? 0 : 1, */}
            {/*     translateY: reverse ? 55 : 50, */}
            {/*   }} */}
            {/*   transition={{ */}
            {/*     delay: !reverse ? i * 300 : (words.length - 1 - i) * 300, // Reverse stagger */}
            {/*     duration: 500, */}
            {/*   }} */}
            {/*   onDidAnimate={(key, finished) => { */}
            {/*     if (key === "opacity" && finished && i === words.length - 1) { */}
            {/*       setReverse((prev) => !prev); */}
            {/*     } */}
            {/*   }} */}
            {/* > */}
            <Text
              style={{
                fontSize: 22,
                fontFamily: "SpaceMono-Regular",
              }}
            >
              {w + " "}
            </Text>
          </MotiView>
        );
      })}
    </View>
  );
};
