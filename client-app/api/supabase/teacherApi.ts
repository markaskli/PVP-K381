import axiosInstance from "../axios";
import { RegisterTeacherData } from "./types";

const BASE_URL = `http://localhost:5228/api/Teacher`;

export const teacherApi = {
  registerTeacher: async ({
    userInformation,
  }: {
    userInformation: RegisterTeacherData;
  }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, userInformation);

    return result.data;
  },
};
