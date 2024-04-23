import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "../authenticationApi";
import { QueryKey } from "../../../react-query/queryKeys";
import { groupApi } from "../groupsApi";
export const useRemoveChildFromGroup = () => {
  return useMutation({
    mutationKey: [QueryKey.REMOVE_CHILD_FROM_GROUP],
    mutationFn: groupApi.removeChildFromGroup,
  });
};
