import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GREY_COLOR, PRIMARY_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { useAppContext } from "../../../contexts/appContext";

export const ChildInsertionPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { child } = useAppContext();
  const handleButtonPress = () => {
    // Handle button press action here
    navigation.navigate("AddChildPage");
  };
  const handleAddChild = () => {
    navigation.navigate("AddChildPage");
  };
  return (
    <FormPage title='Vaiko priskyrimas'>
      <View style={styles.container}>
        <View style={styles.insertionContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddChild}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Registruotis</Text>
        </TouchableOpacity>
      </View>
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
  insertionContainer: {
    marginBottom: 100,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    color: "#000",
    backgroundColor: GREY_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
