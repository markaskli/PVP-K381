import axiosInstance from "../axios";
import { LoginParentOrTeacherData, RegisterParentData } from "./types";

const BASE_URL = `http://localhost:5228/api/User`;

export const authenticationApi = {
  loginParentOrTeacher: async ({
    userInformation,
  }: {
    userInformation: LoginParentOrTeacherData;
  }) => {
    const result = await axiosInstance.post(
      `${BASE_URL}/signIn`,
      userInformation
    );

    return result.data;
  },
};
