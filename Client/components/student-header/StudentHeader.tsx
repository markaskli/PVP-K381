import React from "react";
import { styled } from "nativewind";
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";
const StyledView = styled(View);

type StudentHeaderProps = {};


export const StudentHeader: React.FC<StudentHeaderProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.profileBubble}
      ></TouchableOpacity>
    </SafeAreaView>
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
  },
  profileBubble: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: ACCENT_COLOR,
  },
});
