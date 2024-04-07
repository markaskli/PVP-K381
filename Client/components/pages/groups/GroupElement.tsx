import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Group } from "./types/types";
import { useDeleteRoom } from "./groupsQueries";

type GroupElementProps = {
  group: Group;
  refetchRooms: () => void;
};

export const GroupElement: React.FC<GroupElementProps> = ({
  group,
  refetchRooms,
}) => {
  const deleteRoom = useDeleteRoom();

  const handleRoomDeletion = () => {
    deleteRoom.mutate(
      {
        id: group.id,
      },
      {
        onSuccess: () => {
          console.log("Deleted successfully");
          refetchRooms();
        },
        onError: (err) => {
          console.log(err.message);
        },
      }
    );
  };

  return (
    <View style={styles.element}>
      <Text>{group.name}</Text>
      <Text onPress={handleRoomDeletion}>X</Text>
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
});
