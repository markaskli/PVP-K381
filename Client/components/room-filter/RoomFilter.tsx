import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useGetRooms } from "../pages/groups/groupsQueries";
import { ACCENT_COLOR, GREY_COLOR } from "../../utils/constants";
import { useAppContext } from "../../contexts/appContext";

type RoomFilterProps = {
  rooms: any;
};

export const RoomFilter: React.FC<RoomFilterProps> = ({ rooms }) => {
  const { setSelectedGroup, selectedGroup } = useAppContext();
  if (!rooms) return;
  return (
    <ScrollView contentContainerStyle={{marginVertical: 30}}>
      <View style={styles.container}>
        {selectedGroup && (
          <TouchableOpacity
            onPress={() => setSelectedGroup("")}
            style={[
              styles.room,
              {
                backgroundColor: !selectedGroup ? ACCENT_COLOR : GREY_COLOR,
              },
            ]}
          >
            <Text>Panaikinti pasirinkimą</Text>
          </TouchableOpacity>
        )}
        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            onPress={() => setSelectedGroup(room?.id)}
            style={[
              styles.room,
              {
                backgroundColor:
                  selectedGroup === room?.id ? ACCENT_COLOR : GREY_COLOR,
              },
            ]}
          >
            <Text>{room?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  room: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: GREY_COLOR,
  },
});
