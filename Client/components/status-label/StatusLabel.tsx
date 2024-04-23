import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../utils/constants";

type StatusLabelProps = {
  isFinished: boolean;
};

export const StatusLabel: React.FC<StatusLabelProps> = ({ isFinished }) => {
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: isFinished ? PRIMARY_COLOR : ACCENT_COLOR },
      ]}
    >
      <Text style={styles.label}>{isFinished ? "Atlikta" : "Neatlikta"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: "flex",
    minWidth: 110,
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
});
