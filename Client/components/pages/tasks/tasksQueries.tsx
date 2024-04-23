import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { tasksApi } from "../../../api/supabase/tasksApi";
export const useGetTasksByUser = (userId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_TASKS_BY_USER, { userId }],
    queryFn: tasksApi.getTasksByUser,
  });
};
export const useGetChildTasks = (userId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_CHILD_TASKS, { userId }],
    queryFn: tasksApi.getChildTasks,
  });
};

export const useGetAssignedTaskById = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ASSIGNED_TASK_BY_ID, { id }],
    queryFn: tasksApi.getAssignedTaskById,
  });
};
