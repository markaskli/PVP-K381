import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TaskPreview } from "../../task-preview/TaskPreview";
import { useGetTaskById } from "../task/taskQueries";

type RootStackParamList = {
  TaskPreview: { taskId: string }; // Define the parameter type for TaskEdit screen
};

type TaskPreviewScreenRouteProp = RouteProp<RootStackParamList, "TaskPreview">;

export const TaskPreviewPage = () => {
  const route = useRoute<TaskPreviewScreenRouteProp>();
  const { taskId } = route.params || {};

  const { data: task } = useGetTaskById(taskId);
  if (!task) return;
  return (
    <View>
      <TaskPreview task={task} />
    </View>
  );
};
