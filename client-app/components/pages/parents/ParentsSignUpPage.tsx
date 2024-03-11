import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BaseInput } from "../../input/BaseInput";
import { PRIMARY_COLOR } from "../../../utils/constants";
import { BasePage } from "../../base-page/basePage";
import { FormPage } from "../../base-page/FormPage";

export const ParentsSignUpPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const handleButtonPress = () => {
    // Handle button press action here
    navigation.navigate("ChildInsertionPage");
  };
  return (
    <FormPage title={"Registracija"}>
      <View style={styles.inlineWrapper}>
        <BaseInput label={"Vardas"} />
        <BaseInput label={"Pavardė"} />
      </View>

      <View style={styles.inlineWrapper}>
        <BaseInput label='El. paštas' />
        <BaseInput label='Telefono numeris' />
      </View>
      <BaseInput label={"Gimimo data"} />
      <BaseInput label={"Slaptažodis"} />
      <BaseInput label={"Pakartokite slaptažodį"} />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Registruotis</Text>
      </TouchableOpacity>
    </FormPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  bubbleContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  inlineWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  middleContainer: {
    maxWidth: 500,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  bubble: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
    borderRadius: 50,
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
});
