import { StyleSheet, Pressable } from "react-native";
import { MotiView, useDynamicAnimation } from "moti";

function Shape() {
  const animation = useDynamicAnimation(() => ({
    opacity: 1,
  }));

  return (
    <Pressable
      onPressIn={() => {
        animation.animateTo({
          opacity: 0.4,
        });
      }}
      onPressOut={() => {
        animation.animateTo((current) => ({
          ...current,
          opacity: 1,
        }));
      }}
    >
      <MotiView state={animation} style={[styles.shape, styles.shape2]} />
    </Pressable>
  );
}

export default function Variants() {
  return (
    <MotiView style={styles.container}>
      <Shape />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "black",
  },
  shape2: {
    backgroundColor: "hotpink",
    marginTop: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#111",
  },
});
