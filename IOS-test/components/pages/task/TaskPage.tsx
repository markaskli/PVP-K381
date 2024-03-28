import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TaskForm } from "./TaskForm";
import { View } from "react-native";

type RootStackParamList = {
  TaskEdit: { taskId: string }; // Define the parameter type for TaskEdit screen
};

type TaskEditScreenRouteProp = RouteProp<RootStackParamList, "TaskEdit">;

export const TaskPage = () => {
  const route = useRoute<TaskEditScreenRouteProp>();
  const { taskId } = route.params || {};

  return (
    <View>
      <TaskForm taskId={taskId} />
    </View>
  );
};
