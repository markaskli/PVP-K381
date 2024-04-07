import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { parentsApi } from "../../../api/supabase/parentsApi";
export const useAddChild = () => {
  return useMutation({
    mutationKey: [QueryKey.ADD_CHILD],
    mutationFn: parentsApi.addChild,
  });
};
