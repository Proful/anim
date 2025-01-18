import { View, Text } from "react-native";
import React from "react";

import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { FC } from "react";
const data = [
  {
    route: "13/hello_world",
    name: "Hello World",
  },
  {
    route: "13/loop",
    name: "Loop",
  },
  {
    route: "13/action_menu",
    name: "Action Menu",
  },
  {
    route: "13/exit_before_enter",
    name: "Exit Before Enter",
  },
  {
    route: "13/presence",
    name: "Presence",
  },
  {
    route: "13/variants",
    name: "Variants",
  },
  {
    route: "13/animate_state",
    name: "Animate State",
  },
  {
    route: "13/dynamic_animation",
    name: "Dynamic Animation",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ROUTE_ITEM_WIDTH = SCREEN_WIDTH * 0.9;
const ROUTE_ITEM_HEIGHT = 70;

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        gap: 10,
        marginTop: 10,
      }}
      style={{
        flex: 1,
      }}
    >
      {data.map((item, i) => (
        <RouteItem key={i} route={item.route} name={item.name} />
      ))}
    </ScrollView>
  );
}

type RouteItemProps = {
  route: string;
  name: string;
};

const RouteItem: FC<RouteItemProps> = ({ route, name }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,.7)",
        width: ROUTE_ITEM_WIDTH,
        height: ROUTE_ITEM_HEIGHT,
        justifyContent: "center",
        borderRadius: 5,
        elevation: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push(("/" + route) as any)}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "rgba(256,256,256,1)",
            fontWeight: 700,
            fontSize: 18,
            marginLeft: 20,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
