import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "../authenticationApi";
import { QueryKey } from "../../../react-query/queryKeys";
export const useChangePassword = () => {
  return useMutation({
    mutationKey: [QueryKey.CHANGE_PASSWORD],
    mutationFn: authenticationApi.changePassword,
  });
};
