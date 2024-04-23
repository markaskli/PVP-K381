import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { groupApi } from "../../../api/supabase/groupsApi";
import { childApi } from "../childApi";
import { tasksApi } from "../tasksApi";

export type GetChildrensByParentIdQueryKey = [
  QueryKey.GET_CHILDS_BY_PARENT,
  {
    id: string;
  }
];

export const useCompleteTaskChild = () => {
  return useMutation({
    mutationKey: [QueryKey.COMPLETE_TASK_CHILD],
    mutationFn: tasksApi.completeTaskForChild,
  });
};
export const useCompleteTaskParent = () => {
  return useMutation({
    mutationKey: [QueryKey.COMPLETE_TASK_PARENT],
    mutationFn: tasksApi.completeTaskForParent,
  });
};
export const useGetParentChilds = (parentId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_CHILDS_BY_PARENT, { id: parentId }],
    queryFn: childApi.getChildrenByParent,
  });
};
export const useGetChildRooms = () => {
  return useQuery({
    queryKey: [QueryKey.GET_CHILD_ROOMS],
    queryFn: groupApi.getChildRooms,
  });
};
export const useGetRoomById = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ROOM_BY_ID, { id }],
    queryFn: groupApi.getRoomById,
    enabled: !!id,
  });
};
export const useDeleteRoom = () => {
  return useMutation({
    mutationKey: [QueryKey.DELETE_ROOM],
    mutationFn: groupApi.deleteRoom,
  });
};
