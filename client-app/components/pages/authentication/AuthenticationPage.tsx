import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../../utils/constants";
import { BasePage } from "../../base-page/basePage";
import {
  AuthenticationActionTypes,
  useAppContext,
} from "../../../contexts/appContext";

export const AuthenticationPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { setAuthenticationAction } = useAppContext();
  const handleButtonPress = (action: AuthenticationActionTypes) => {
    setAuthenticationAction(action);
    navigation.navigate("RoleSelectionPage");
  };
  return (
    <BasePage>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>Sveiki</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => handleButtonPress("register")}
      >
        <Text style={styles.buttonText}>Registruotis</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => handleButtonPress("login")}
      >
        <Text style={styles.buttonText}>Prisijungti</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require("../students/registration/liftingHealthy.svg")}
      />
    </BasePage>
  );
};

const styles = StyleSheet.create({
  middleContainer: {
    maxWidth: 500,
    alignItems: "center",
    marginBottom: 100,
    justifyContent: "center",
    display: "flex",
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#232222",
    textAlign: "left",
    marginBottom: 20,
  },
  image: {
    resizeMode: "contain",
    height: 200,
  },
  buttonLogin: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: 250,
  },
  buttonRegister: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
