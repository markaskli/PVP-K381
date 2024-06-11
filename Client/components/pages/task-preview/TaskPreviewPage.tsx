import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { TaskPreview } from "../../task-preview/TaskPreview";
import { TaskCompletion } from "../../types/types";
import { useGetAssignedTaskById } from "../tasks/tasksQueries";

type RootStackParamList = {
  TaskPreview: { taskId: string }; // Define the parameter type for TaskEdit screen
};

type TaskPreviewScreenRouteProp = RouteProp<RootStackParamList, "TaskPreview">;

export const TaskPreviewPage = () => {
  const route = useRoute<TaskPreviewScreenRouteProp>();
  const { taskId } = route.params || {};

  const { data: tasks } = useGetAssignedTaskById(taskId);
  const taskData = useMemo(() => {
    if (!tasks) return;
    const initialTask = tasks[0];
    const childCompletionStates: TaskCompletion[] = tasks.map((task) => ({
      isConfirmedByParent: task.isConfirmedByParent,
      isConfirmedByChild: task.isConfirmedByChild,
      childId: task.assignedToChildId,
    }));

    return {
      task: initialTask,
      completions: childCompletionStates,
    };
  }, [tasks]);

  if (!taskData) return;
  return (
    <View>
      <TaskPreview task={taskData} />
    </View>
  );
};
