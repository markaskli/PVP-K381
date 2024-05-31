import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { TaskCompletion } from "../../types/types";
import { ParentTaskPreview } from "../../parent-task-preview/ParentTaskPreview";
import { useGetAssignedTaskById } from "../tasks/tasksQueries";
import { useGetTaskById } from "../task/taskQueries";

type RootStackParamList = {
  ParentTaskPreview: { taskId: string }; // Define the parameter type for ParentTaskEdit screen
};

type TaskPreviewScreenRouteProp = RouteProp<
  RootStackParamList,
  "ParentTaskPreview"
>;

export const ParentTaskPreviewPage = () => {
  const route = useRoute<TaskPreviewScreenRouteProp>();
  const { taskId } = route.params || {};

  const { data: tasks } = useGetTaskById(taskId);

  const taskData = useMemo(() => {
    if (!tasks) return;
    const initialTask = tasks[0];
    const childCompletionStates: TaskCompletion[] = tasks.map((task) => ({
      isConfirmedByParent: task.isConfirmedByParent,
      isConfirmedByChild: task.isConfirmedByChild,
      childName: task.childName,
      childId: task.assignedToChildId,
      id: task.id,
    }));

    return {
      task: initialTask,
      completions: childCompletionStates,
    };
  }, [tasks]);

  if (!taskData) return;
  return (
    <View>
      <ParentTaskPreview task={taskData} />
    </View>
  );
};
