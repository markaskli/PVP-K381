import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { authenticationApi } from "../../../api/supabase/authenticationApi";
export const useSignOut = () => {
  return useMutation({
    mutationKey: [QueryKey.SIGN_OUT],
    mutationFn: authenticationApi.signOut,
  });
};
