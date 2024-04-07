import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { teacherApi } from "../../../api/supabase/teacherApi";
export const useRegisterTeaher = () => {
  return useMutation({
    mutationKey: [QueryKey.SIGN_UP_TEACHER],
    mutationFn: teacherApi.registerTeacher,
  });
};
