import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { parentsApi } from "../../../api/supabase/parentsApi";
import { authenticationApi } from "../../../api/supabase/authenticationApi";
export const useRegisterParent = () => {
  return useMutation({
    mutationKey: [QueryKey.SIGN_UP_PARENT],
    mutationFn: parentsApi.registerParent,
  });
};
export const useLoginParentOrTeacher = () => {
  return useMutation({
    mutationKey: [QueryKey.LOG_IN_PARENT],
    mutationFn: authenticationApi.loginParentOrTeacher,
  });
};
