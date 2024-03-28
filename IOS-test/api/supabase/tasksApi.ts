import { QueryKey } from "../../react-query/queryKeys";
import axiosInstance from "../axios";
import { CreateTaskData } from "./types";

const BASE_URL = `http://localhost:5228/api/Task`;

export type FindReservationByIdQueryKey = [
  QueryKey.GET_TASKS_BY_USER,
  {
    userId: string;
  }
];

export type FindTaskByIdQueryKey = [
  QueryKey.GET_TASK_BY_ID,
  {
    id: string;
  }
];

export type GetChildTasksQueryKey = [
  QueryKey.GET_CHILD_TASKS,
  {
    userId: string;
  }
];

export const tasksApi = {
  getTasksByUser: async ({
    queryKey,
  }: {
    queryKey: FindReservationByIdQueryKey;
  }) => {
    const result = await axiosInstance.get(
      `${BASE_URL}/userId?userId=${queryKey[1].userId}`
    );
    return result.data;
  },
  getChildTasks: async ({ queryKey }: { queryKey: GetChildTasksQueryKey }) => {
    console.log(`${BASE_URL}/childId?childId=${queryKey[1].userId}`);
    const result = await axiosInstance.get(
      `${BASE_URL}/childId?childId=${queryKey[1].userId}`
    );
    return result.data;
  },
  createTaskForRoom: async ({ task }: { task: CreateTaskData }) => {
    const result = await axiosInstance.post(`${BASE_URL}/room`, task);
    return result.data;
  },
  getTasksById: async ({ queryKey }: { queryKey: FindTaskByIdQueryKey }) => {
    const result = await axiosInstance.get(`${BASE_URL}/${queryKey[1].id}`);
    return result.data;
  },
};
