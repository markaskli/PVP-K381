import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useGetTasksByUser } from "./tasksQueries";
import { CreatedTask } from "../../../api/supabase/types";
import { Task } from "../../task/Task";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useAppContext } from "../../../contexts/appContext";

const StyledView = styled(TouchableOpacity);

type TasksPageProps = {
  userId: string;
};

export const TasksPage: React.FC<TasksPageProps> = ({ userId }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedGroup } = useAppContext();
  const { data: tasks } = useGetTasksByUser(userId);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (!selectedGroup) return tasks;
    return tasks.filter((task) => task?.roomId === selectedGroup);
  }, [tasks, selectedGroup]);

  if (!tasks) return;
  return (
    <View>
      {filteredTasks.map((task: CreatedTask) => (
        <StyledView
          onPress={() =>
            navigation.navigate("Task", { taskId: task.id.toString() })
          }
          className='mb-4'
          key={task.id}
        >
          <Task task={task} />
        </StyledView>
      ))}
    </View>
  );
};
