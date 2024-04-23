import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { tasksApi } from "../../../api/supabase/tasksApi";
export const useCreateTaskForRoom = () => {
  return useMutation({
    mutationKey: [QueryKey.CREATE_TASK_FOR_ROOM],
    mutationFn: tasksApi.createTaskForRoom,
  });
};
export const useGetAssignedTaskById = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ASSIGNED_TASK_BY_ID, { id }],
    queryFn: tasksApi.getAssignedTaskById,
    enabled: !!id,
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_TASK_BY_ID, { id }],
    queryFn: tasksApi.getTasksById,
    enabled: !!id,
  });
};
