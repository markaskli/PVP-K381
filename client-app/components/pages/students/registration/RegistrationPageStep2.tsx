import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../../../utils/constants";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

export const RegistrationPageStep2: React.FC = () => {
  const [code, setCode] = useState("");

  const handleButtonPress = () => {
    // Handle button press action here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>Kuo jūs vardu?</Text>
        <TextInput
          style={styles.codeInput}
          placeholder='DBC-125'
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Baigti registraciją</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={require("./doctors.svg")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  middleContainer: {
    width: 500,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 450,
    marginBottom: 30,
  },
  image: {
    resizeMode: "contain",
    height: 200,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
