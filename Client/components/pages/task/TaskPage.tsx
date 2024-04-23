import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TaskForm } from "./TaskForm";
import { View } from "react-native";
import { useGetChildTasks, useGetTasksByUser } from "../tasks/tasksQueries";
import { useAppContext } from "../../../contexts/appContext";

type RootStackParamList = {
  TaskEdit: { taskId: string }; // Define the parameter type for TaskEdit screen
};

type TaskEditScreenRouteProp = RouteProp<RootStackParamList, "TaskEdit">;

export const TaskPage = () => {
  const { selectUser } = useAppContext();
  const { data: tasksChild, refetch: refetchChildTasks } = useGetChildTasks(
    selectUser.id
  );
  const { data: tasksParent, refetch: refetchParentTasks } = useGetTasksByUser(
    selectUser.id
  );

  const route = useRoute<TaskEditScreenRouteProp>();
  const { taskId } = route.params || {};

  return (
    <View>
      <TaskForm
        refetch={tasksChild ? refetchChildTasks : refetchParentTasks}
        taskId={taskId}
      />
    </View>
  );
};
