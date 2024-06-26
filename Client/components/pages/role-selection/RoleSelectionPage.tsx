import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  AuthenticationActionTypes,
  useAppContext,
} from "../../../contexts/appContext";
import { Role } from "../../types/types";
import { pagesNaming } from "./pageNavigation";
import { BasePage } from "../../base-page/BasePage";

export const RoleSelectionPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { authenticationAction } = useAppContext();
  const handleButtonPress = (role: Role) => {
    const userRolePath = pagesNaming[role];
    navigation.navigate(
      userRolePath[authenticationAction as AuthenticationActionTypes]
    );
  };

  return (
    <BasePage>
      <ScrollView>
        <View style={styles.middleContainer}>
          <Text style={styles.title}>Rolė</Text>
        </View>
        <View style={styles.bubbleContainer}>
          <TouchableOpacity
            style={styles.bubbleElement}
            onPress={() => handleButtonPress("teacher")}
          >
            <Image
              style={styles.bubble}
              source={require("../../../assets/teacher.png")}
            />
            <Text style={styles.buttonText}>Mokytojas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bubbleElement}
            onPress={() => handleButtonPress("parent")}
          >
            <Image
              style={styles.bubble}
              source={require("../../../assets/parent.png")}
            />
            <Text style={styles.buttonText}>Tėvai</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bubbleElement}
            onPress={() => handleButtonPress("student")}
          >
            <Image
              style={styles.bubble}
              source={require("../../../assets/child.png")}
            />
            <Text style={styles.buttonText}>Vaikas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  bubbleElement: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  bubble: {
    width: 100,
    height: 100,
    objectFit: "contain",
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
