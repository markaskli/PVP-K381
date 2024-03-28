import { QueryKey } from "../../react-query/queryKeys";
import axiosInstance from "../axios";
import { RegisterChildRequest } from "./types";

const BASE_URL = `http://localhost:5228/api/Child`;

export type GetChildByParentIdQueryKey = [
  QueryKey.GET_CHILDS_BY_PARENT,
  {
    id: string;
  }
];

export const childApi = {
  registerChild: async ({
    userInformation,
  }: {
    userInformation: RegisterChildRequest;
  }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, userInformation);

    return result.data;
  },
  getChildrenByParent: async ({
    queryKey,
  }: {
    queryKey: GetChildByParentIdQueryKey;
  }) => {
    console.log(`${BASE_URL}/parent?parentId=${queryKey[1].id}`);
    const result = await axiosInstance.get(
      `${BASE_URL}/parent?parentId=${queryKey[1].id}`
    );

    return result.data;
  },
};
