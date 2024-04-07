import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ACCENT_COLOR,
  GREY_COLOR,
  PRIMARY_COLOR,
} from "../../../utils/constants";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useSignOut } from "./dashboardQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../../contexts/appContext";

const StyledButton = styled(TouchableOpacity);

const links = [{ name: "Grupės", path: "Groups" }];

export const DashboardNavbar = () => {
  const signOut = useSignOut();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { changeIsLoggedIn } = useAppContext();

  const handleNavigation = (path: string) => {
    navigation.navigate(path as any);
  };
  const handleSignOut = async () => {
    signOut.mutate();
    await AsyncStorage.clear();
    changeIsLoggedIn(false);
    navigation.navigate("AuthenticationPage");
  };

  const handleProfileNavigation = async () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {links.map((link, id) => (
        <StyledButton
          key={id}
          onPress={() => handleNavigation(link.path)}
          style={styles.button}
          className='p-3'
        >
          <Text style={styles.buttonText}>{link.name}</Text>
        </StyledButton>
      ))}
      <StyledButton
        onPress={handleProfileNavigation}
        style={styles.bubble}
      ></StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ACCENT_COLOR,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 42,
    fontWeight: "900",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: GREY_COLOR,
    borderRadius: 10,
    width: 100,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
  },
  bubble: {
    width: 35,
    height: 35,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 20,
  },
});
