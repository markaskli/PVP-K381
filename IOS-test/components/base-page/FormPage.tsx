import React from "react";

import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../utils/constants";

export const FormPage: React.FC<{
  children: React.ReactNode;
  title: string;
  parentOrTeacher?: boolean;
}> = ({ children, title, parentOrTeacher = false }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={!parentOrTeacher ? styles.title : styles.titleParentOrTeacher}
      >
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.formContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  title: {
    height: 150,
    width: "100%",
    backgroundColor: PRIMARY_COLOR,
    display: "flex",
    justifyContent: "flex-end",
    padding: 20,
  },
  titleParentOrTeacher: {
    height: 150,
    width: "100%",
    backgroundColor: ACCENT_COLOR,
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
    marginRight: 20,
    marginLeft: 20,
  },
});
