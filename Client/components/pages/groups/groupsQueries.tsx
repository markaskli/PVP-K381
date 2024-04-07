import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { groupApi } from "../../../api/supabase/groupsApi";
export const useCreateRoom = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: [QueryKey.CREATE_ROOM],
    mutationFn: groupApi.createRoom,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
export const useJoinRoom = () => {
  return useMutation({
    mutationKey: [QueryKey.JOIN_ROOM],
    mutationFn: groupApi.joinRoom,
  });
};
export const useGetRooms = () => {
  return useQuery({
    queryKey: [QueryKey.GET_ROOMS],
    queryFn: groupApi.getRooms,
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
