import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Group } from "../pages/groups/types/types";
import {
  ACCENT_COLOR,
  COMPLEMENTARY_COLOR,
  DARK_COMPLEMENTARY_COLOR,
  PRIMARY_COLOR,
} from "../../utils/constants";
import { RootStackParamList } from "../../utils/navigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../contexts/appContext";

type GroupsListProps = {
  groups: Group[];
  onlyList?: boolean;
};

export const GroupsList: React.FC<GroupsListProps> = ({
  groups,
  onlyList = false,
}) => {
  const { setSelectedGroup, selectedGroup } = useAppContext();
  const styles = generateStyling(onlyList);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRoomCreatePath = () => {
    navigation.navigate("JoinGroup");
  };

  if (!groups) return;
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {groups.map((group, index) => (
          <TouchableOpacity
            onPress={() => setSelectedGroup(group?.id)}
            key={index}
            style={
              selectedGroup === group.id || onlyList
                ? styles.buttonActive
                : styles.button
            }
          >
            <Text style={styles.groupButtonText}>{group?.name}</Text>
          </TouchableOpacity>
        ))}
        {!onlyList && (
          <TouchableOpacity
            onPress={handleRoomCreatePath}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Sukurti kambarį</Text>
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
