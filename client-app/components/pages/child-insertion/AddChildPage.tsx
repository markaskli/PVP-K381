import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BaseInput } from "../../input/BaseInput";
import { ACCENT_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { useAppContext } from "../../../contexts/appContext";

export const AddChildPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [childName, setChildName] = useState("");
  const { addChild } = useAppContext();
  const handleButtonPress = () => {
    // Handle button press action here
    addChild(childName);
    navigation.navigate("ChildInsertionPage");
  };
  return (
    <FormPage title='Vaiko priskyrimas'>
      <View style={styles.inputsContainer}>
        <BaseInput value={childName} onChange={setChildName} label='Vardas' />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Pridėti vaiką</Text>
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
});
