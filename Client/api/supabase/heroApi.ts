import { QueryKey } from "../../react-query/queryKeys";
import axiosInstance from "../axios";

const BASE_URL = `http://localhost:5228/api/Hero`;
const BASE_URL_PRODUCTS = `http://localhost:5228/api/Product`;

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
  feedHero: async ({
    heroId,
    productId,
  }: {
    heroId: string;
    productId: string;
  }) => {
    const result = await axiosInstance.patch(
      `${BASE_URL}?id=${heroId}&productId=${productId}`
    );
    return result.data;
  },
  getProducts: async () => {
    const result = await axiosInstance.get(`${BASE_URL_PRODUCTS}`);
    return result.data;
  },
};
