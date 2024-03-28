import axiosInstance from "../axios";
import { ChildInsertionInformation, RegisterParentData } from "./types";

const BASE_URL = `http://localhost:5228/api/Parent`;

export const parentsApi = {
  registerParent: async ({
    userInformation,
  }: {
    userInformation: RegisterParentData;
  }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, userInformation);

    return result.data;
  },
  addChild: async ({
    childInformation,
  }: {
    childInformation: ChildInsertionInformation;
  }) => {
    const result = await axiosInstance.post(
      `${BASE_URL}/addChild`,
      childInformation
    );

    return result.data;
  },
};
