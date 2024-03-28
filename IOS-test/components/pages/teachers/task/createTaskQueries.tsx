import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../../react-query/queryKeys";
import { tasksApi } from "../../../../api/supabase/tasksApi";
export const useCreateTask =   () => {
  return useMutation({
    mutationKey: [QueryKey.CREATE_TASK],
    mutationFn: tasksApi.createTask,
  });
};
