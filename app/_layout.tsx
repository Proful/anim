import { Stack } from "expo-router";
export const data = [
  {
    route: "16/onboarding",
    name: "Onboarding",
  },
  {
    route: "15/carousal",
    name: "Carousal",
  },
  {
    route: "14/animated_slider",
    name: "Animated Slider",
  },
  {
    route: "13/moti",
    name: "Moti",
  },
  {
    route: "12/text_animator_moti",
    name: "Text Animator ",
  },
  {
    route: "11/oscillating",
    name: "Oscillating",
  },
  {
    route: "10/clock",
    name: "Clock",
  },
  {
    route: "09/firey_ball",
    name: "Firey Ball",
  },
  {
    route: "08/moving_stars",
    name: "Moving Stars",
  },
  {
    route: "01/circular",
    name: "3 Circle",
  },
  {
    route: "02/orbiting",
    name: "Orbiting",
  },
  {
    route: "02/spoke",
    name: "Spoke",
  },
  {
    route: "02/hexagon",
    name: "Hexagon",
  },
  {
    route: "02/multiple_hexagon",
    name: "Multiple Hexagon",
  },
  {
    route: "02/dotted_spoke",
    name: "Dotted Spoke",
  },
  {
    route: "02/square_spoke",
    name: "Square Spoke",
  },
  {
    route: "03/arc",
    name: "Moving Arc",
  },
  {
    route: "04/flower",
    name: "Circular Flower",
  },
  {
    route: "04/breathe",
    name: "Breathe",
  },
  {
    route: "05/rect",
    name: "Rectie",
  },
  {
    route: "06/wave",
    name: "Wave Pattern",
  },
  {
    route: "07/rainbow_circles",
    name: "Rainbow Colors",
  },
];

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Animation" }} />

      {data &&
        data.map((item, i) => (
          <Stack.Screen
            key={i}
            name={item.route}
            options={{ title: item.name }}
          />
        ))}
    </Stack>
  );
}
