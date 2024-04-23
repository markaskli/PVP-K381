import React from "react";
import { styled } from "nativewind";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";

type StudentHeaderProps = {};

export const StudentHeader: React.FC<StudentHeaderProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          style={styles.image}
          alt='reward'
          source={require("../../assets/profile.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 30,
    objectFit: "contain",
  },
});
