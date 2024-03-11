import React from "react";

import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../../utils/constants";

export const FormPage: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.formContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  },
  title: {
    height: 150,
    width: "100%",
    backgroundColor: PRIMARY_COLOR,
    display: "flex",
    justifyContent: "flex-end",
    padding: 20,
  },
  text: {
    fontSize: 44,
    fontWeight: "700",
    color: "#fff",
  },
  formContainer: {
    marginTop: 50,
  },
});
