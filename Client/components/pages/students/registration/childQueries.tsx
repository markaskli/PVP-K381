import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../../react-query/queryKeys";
import { childApi } from "../../../../api/supabase/childApi";
import { authenticationApi } from "../../../../api/supabase/authenticationApi";
export const useRegisterChild = () => {
  return useMutation({
    mutationKey: [QueryKey.REGISTER_CHILD],
    mutationFn: childApi.registerChild,
  });
};
export const useLoginChild = () => {
  return useMutation({
    mutationKey: [QueryKey.LOGIN_CHILD],
    mutationFn: authenticationApi.loginChild,
  });
};
