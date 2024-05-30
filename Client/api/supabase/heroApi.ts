import { QueryKey } from "../../react-query/queryKeys";
import axiosInstance from "../axios";
import { ChildInGroupRemoveRequest } from "./types";

const BASE_URL = `http://localhost:5228/api/Hero`;

export type GetRoomByIdQueryKey = [
  QueryKey.GET_ROOM_BY_ID,
  {
    id: string;
  }
];

export const heroesApi = {
  getHeroes: async () => {
    const result = await axiosInstance.get(`${BASE_URL}`);
    return result.data;
  },
  getChildHeroes: async () => {
    const result = await axiosInstance.get(`${BASE_URL}/child`);
    return result.data;
  },
  buyHero: async ({ id }: { id: string }) => {
    const result = await axiosInstance.post(`${BASE_URL}/acquire/${id}`);
    return result.data;
  },
};
