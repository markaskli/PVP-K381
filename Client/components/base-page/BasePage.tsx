import React from "react";

import { StyleSheet, SafeAreaView } from "react-native";

export const BasePage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
});
