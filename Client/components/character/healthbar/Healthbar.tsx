import React from "react";

import { StyleSheet, Image, View } from "react-native";
import {
  COLOR_RED,
  GREY_COLOR,
  LIGHER_GREY_COLOR,
  LIGHT_GREEN,
} from "../../../utils/constants";

export const Healthbar = () => {
  const health = 44;

  const healthbarColor = health < 30 ? COLOR_RED : LIGHT_GREEN;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.health,
          { width: `${health}%`, backgroundColor: healthbarColor },
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    height: 15,
    position: "relative",
    borderWidth: 1,
    borderColor: GREY_COLOR,
    overflow: "hidden",
    backgroundColor: LIGHER_GREY_COLOR,
  },
  health: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 15,
  },
});
