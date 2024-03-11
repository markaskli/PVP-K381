import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type BaseInput = {
  label: string;
  value: string;
  onChange: (text: string) => void;
};

export const BaseInput: React.FC<BaseInput> = ({ label, onChange, value }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  input: {
    backgroundColor: "#F5EBEB",
    height: 35,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
  },
});
