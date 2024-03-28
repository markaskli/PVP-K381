import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import {
  COMPLEMENTARY_COLOR,
  DARK_COMPLEMENTARY_COLOR,
  PRIMARY_COLOR,
} from "../../utils/constants";
import { RootStackParamList } from "../../utils/navigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Children } from "../types/types";

type GroupsListProps = {
  childrens: Children[];
  onlyList?: boolean;
};

export const ChildrensList: React.FC<GroupsListProps> = ({
  childrens,
  onlyList = false,
}) => {
  const styles = generateStyling(onlyList);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChildrenProfilePath = (id: string) => {
    navigation.navigate("ChildrenPreview", { childrenId: id });
  };

  const handleAddChildPath = () => {
    navigation.navigate("AddChildPage");
  };

  if (!childrens) return;
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {childrens.map((children, index) => (
          <TouchableOpacity
            onPress={() => handleChildrenProfilePath(children?.id)}
            key={index}
            style={onlyList ? styles.buttonActive : styles.button}
          >
            <Text style={styles.groupButtonText}>{children?.name}</Text>
          </TouchableOpacity>
        ))}
        {!onlyList && (
          <TouchableOpacity
            onPress={handleAddChildPath}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Pridėti vaiką</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const generateStyling = (isList: boolean) => {
  return StyleSheet.create({
    button: {
      backgroundColor: COMPLEMENTARY_COLOR,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonActive: {
      backgroundColor: DARK_COMPLEMENTARY_COLOR,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    groupButtonText: {
      fontWeight: "600",
    },
    createButton: {
      backgroundColor: PRIMARY_COLOR,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    createButtonText: {
      color: "#fff",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: isList ? "flex-start" : "center",
      gap: 20,
    },
    buttonText: {
      color: "#000",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
};
