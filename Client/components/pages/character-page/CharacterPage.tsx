import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  ACCENT_COLOR,
  GREY_COLOR,
  LIGHER_GREY_COLOR,
} from "../../../utils/constants";
import { BasePage } from "../../base-page/BasePage";
import { Character } from "../../character/Character";
import { Healthbar } from "../../character/healthbar/Healthbar";

export const CharacterPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <BasePage>
        <View></View>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Character />
          <View style={{ marginTop: 20 }}>
            <Healthbar />
          </View>
          <View></View>
        </View>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  energyBar: {
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    borderColor: ACCENT_COLOR,
    borderWidth: 1,
  },
  inlineWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  middleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  inputsContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#232222",
    textAlign: "left",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    color: LIGHER_GREY_COLOR,
  },
  image: {
    width: 20,
    height: 20,
  },
});
