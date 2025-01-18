import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { FC } from "react";
import { data } from "./_layout";
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
