import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BasePage } from "../../base-page/BasePage";
import { useGetRooms } from "./groupsQueries";
import { ACCENT_COLOR } from "../../../utils/constants";
import { DashboardNavbar } from "../dashboard/DashboardNavbar";
import { GroupElement } from "./GroupElement";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";

export const GroupsPage = () => {
  const { data: rooms, refetch: refetchGetRooms, isLoading } = useGetRooms();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const refetchRooms = () => {
    refetchGetRooms();
  };

  const handleRoomCreation = () => {
    navigation.navigate("Group");
  };

  return (
    <View>
      <DashboardNavbar />
      <BasePage>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButton}>
              <Text
                onPress={handleRoomCreation}
                style={styles.createButtonText}
              >
                Sukurti grupę
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator size='large' color={ACCENT_COLOR} />
          ) : (
            <View>
              {rooms ? (
                <View style={styles.roomsContainer}>
                  {rooms?.map((room) => (
                    <GroupElement
                      key={room.id}
                      group={room}
                      refetchRooms={refetchRooms}
                    />
                  ))}
                </View>
              ) : (
                <Text>Nėra sukurtų grupių</Text>
              )}
            </View>
          )}
        </View>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  element: {
    backgroundColor: "#fff",
    width: "auto",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  roomsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  createButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ACCENT_COLOR,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    width: 160,
    paddingBottom: 8,
    borderRadius: 10,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    marginBottom: 40,
  },
});
