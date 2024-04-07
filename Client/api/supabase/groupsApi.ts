import { QueryKey } from "../../react-query/queryKeys";
import axiosInstance from "../axios";

const BASE_URL = `http://localhost:5228/api/Room`;

export type DeleteRoomByIDQueryKey = [
  QueryKey.DELETE_ROOM,
  {
    id: string;
  }
];

export type GetRoomByIdQueryKey = [
  QueryKey.GET_ROOM_BY_ID,
  {
    id: string;
  }
];

export const groupApi = {
  createRoom: async ({ name }: { name: string }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, { name });
    return result.data;
  },
  joinRoom: async ({ code }: { code: string }) => {
    const result = await axiosInstance.post(
      `${BASE_URL}/join/?invitationCode=${code}`
    );
    return result.data;
  },
  getRooms: async () => {
    const result = await axiosInstance.get(`${BASE_URL}/creator`);
    return result.data;
  },
  getChildRooms: async () => {
    const result = await axiosInstance.get(`${BASE_URL}/child`);
    return result.data;
  },
  getRoomById: async ({ queryKey }: { queryKey: GetRoomByIdQueryKey }) => {
    const result = await axiosInstance.get(`${BASE_URL}/${queryKey[1].id}`);
    return result.data;
  },
  deleteRoom: async ({ id }: { id: string }) => {
    const result = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return result.data;
  },
};
