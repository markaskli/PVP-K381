import { QueryKey } from '../../react-query/queryKeys';
import axiosInstance from '../axios';
import { CreateTaskData } from './types';

const BASE_URL = `http://10.0.2.2:5228/api/Task`;

export type FindReservationByIdQueryKey = [
  QueryKey.GET_TASKS_BY_USER,
  {
    userId: string;
  }
];

export type FindAssignedTaskByIdQueryKey = [
  QueryKey.GET_ASSIGNED_TASK_BY_ID,
  {
    id: string;
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
    const result = await axiosInstance.get(
      `${BASE_URL}/childId?childId=${queryKey[1].userId}`
    );
    return result.data;
  },
  createTaskForRoom: async ({ task }: { task: CreateTaskData }) => {
    const result = await axiosInstance.post(`${BASE_URL}/room`, task);
    return result.data;
  },
  completeTaskForChild: async ({ taskId }: { taskId: string }) => {
    const result = await axiosInstance.patch(
      `${BASE_URL}/child?taskId=${taskId}`
    );
    return result.data;
  },
  completeTaskForParent: async ({ taskId }: { taskId: string }) => {
    const result = await axiosInstance.patch(
      `${BASE_URL}/creator?taskId=${taskId}`
    );
    return result.data;
  },
  getAssignedTaskById: async ({
    queryKey,
  }: {
    queryKey: FindAssignedTaskByIdQueryKey;
  }) => {
    const result = await axiosInstance.get(`${BASE_URL}/${queryKey[1].id}`);
    return result.data;
  },
  getTasksById: async ({ queryKey }: { queryKey: FindTaskByIdQueryKey }) => {
    const result = await axiosInstance.get(
      `${BASE_URL}/taskId?taskId=${queryKey[1].id}`
    );
    return result.data;
  },
};
