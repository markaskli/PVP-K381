import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BasePage } from "../../../base-page/BasePage";
import { useGetChildRooms } from "../../groups/groupsQueries";
import { GroupsList } from "../../../groups-list/GroupsList";
import { useGetChildTasks } from "../../tasks/tasksQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskList } from "../../../task-list/TaskList";
import { useAppContext } from "../../../../contexts/appContext";

export const Dashboard = () => {
  const { data: rooms } = useGetChildRooms();
  const { selectedGroup } = useAppContext();
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) return;
      setUserId(JSON.parse(user).id);
    };
    checkAuthentication();
  }, []);
  const { data: tasks } = useGetChildTasks(userId);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    setFilteredTasks(filterTasks(selectedGroup));
  }, [selectedGroup]);

  const filterTasks = (groupId: string) => {
    if (!tasks?.length) return [];
    return tasks.filter((task) => task.assignedToRoomId === groupId);
  };

  if (!userId) return;

  return (
    <View>
      <View style={styles.groupContainer}>
        <GroupsList groups={rooms} />
      </View>
      <BasePage>
        <TaskList isStudent tasks={filteredTasks} />
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
  },
});
