import axiosInstance from "../axios";
import {
  ChangePasswordRequest,
  ChildLoginRequest,
  LoginParentOrTeacherData,
} from "./types";

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
  loginChild: async ({
    userInformation,
  }: {
    userInformation: ChildLoginRequest;
  }) => {
    const result = await axiosInstance.post(
      `${BASE_URL}/childSignIn`,
      userInformation
    );

    return result.data;
  },
  signOut: async () => {
    const result = await axiosInstance.post(`${BASE_URL}/signOut`);

    return result.data;
  },
  changePassword: async ({
    passwordDetails,
  }: {
    passwordDetails: ChangePasswordRequest;
  }) => {
    const result = await axiosInstance.patch(
      `${BASE_URL}/changePassword`,
      passwordDetails
    );

    return result.data;
  },
};
