import React, { useEffect, useState } from "react";
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
  groupId?: string;
  onlyList?: boolean;
};

export const ChildrensList: React.FC<GroupsListProps> = ({
  childrens,
  groupId,
  onlyList = false,
}) => {
  const styles = generateStyling(onlyList);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChildrenProfilePath = (id: string) => {
    if (groupId) {
      navigation.navigate("ChildrenInGroupPreview", {
        childId: id,
        userId: groupId,
      });
    } else {
      navigation.navigate("ChildrenPreview", {
        childrenId: id,
      });
    }
  };

  const handleAddChildPath = () => {
    navigation.navigate("AddChildPage");
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {childrens?.length ? (
          childrens?.map((children, index) => (
            <TouchableOpacity
              onPress={() => handleChildrenProfilePath(children?.id)}
              key={index}
              style={onlyList ? styles.buttonActive : styles.button}
            >
              <Text style={styles.groupButtonText}>{children?.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Grupėje nėra vaikų.</Text>
        )}
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
