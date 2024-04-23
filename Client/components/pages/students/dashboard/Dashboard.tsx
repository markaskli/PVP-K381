import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { BasePage } from "../../../base-page/BasePage";
import { useGetChildRooms } from "../../groups/groupsQueries";
import { GroupsList } from "../../../groups-list/GroupsList";
import { useGetChildTasks } from "../../tasks/tasksQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskList } from "../../../task-list/TaskList";
import { useAppContext } from "../../../../contexts/appContext";
import { styled } from "nativewind";

const StyledView = styled(View);

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
    <StyledView className='w-full bg-white'>
      <ScrollView horizontal>
        <View style={styles.groupContainer}>
          <GroupsList onlyList joinGroup groups={rooms} />
        </View>
      </ScrollView>
      <ScrollView>
        <BasePage>
          <TaskList isStudent tasks={filteredTasks} />
        </BasePage>
      </ScrollView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    width: "100%",
    paddingRight: 20,
    height: 70,
  },
});
