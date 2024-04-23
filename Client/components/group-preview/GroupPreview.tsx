import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LIGHER_GREY_COLOR } from "../../utils/constants";
import { BasePage } from "../base-page/BasePage";
import { Button } from "../buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { Group } from "../pages/groups/types/types";
import { useDeleteRoom, useGetRooms } from "../pages/groups/groupsQueries";
import { ChildrensList } from "../childrens-list/ChildrensList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../contexts/appContext";
import { useSignOut } from "../pages/dashboard/dashboardQueries";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";

type ChildrenPreviewProps = {
  group: Group;
  isChild?: boolean;
};

export const GroupPreview: React.FC<ChildrenPreviewProps> = ({
  group,
  isChild = false,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const deleteRoom = useDeleteRoom();
  const { refetch } = useGetRooms();
  const [role, setRole] = useState(-1);

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await AsyncStorage.getItem("user");
      const { roleId } = JSON.parse(userData);
      setRole(roleId);
    };
    getUserRole();
  }, []);

  const signOut = useSignOut();
  const { changeIsLoggedIn } = useAppContext();

  const handleSignOut = async () => {
    signOut.mutate();
    await AsyncStorage.clear();
    changeIsLoggedIn(false);
    navigation.navigate("AuthenticationPage");
  };

  const handleDeleteRoom = () => {
    deleteRoom.mutate(
      { id: group.id },
      {
        onSuccess: (res) => {
          refetch();
          navigation.goBack();
        },
        onError: async (res) => {
          if (res.message.includes("401")) {
            handleSignOut();
          }
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <BasePage>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Atgal</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Grupė</Text>
          <Text style={styles.description}>{group.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Priskyrimo kodas</Text>
          <Text style={styles.description}>{group.invitationCode}</Text>
        </View>
        {role !== 2 && (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Vaikai</Text>
            <ChildrensList
              groupId={group.id}
              onlyList
              childrens={group.children}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduočių skaičius</Text>
          <Text style={styles.description}>{group.tasks?.length}</Text>
        </View>
        {role !== 2 && (
          <View style={styles.footer}>
            <Button onClick={handleDeleteRoom} color={"red"}>
              <Text>Ištrinti</Text>
            </Button>
          </View>
        )}
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
  backText: {
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    paddingTop: 30,
  },
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  description: {
    fontSize: 20,
    color: LIGHER_GREY_COLOR,
    fontWeight: "400",
  },
  footer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
