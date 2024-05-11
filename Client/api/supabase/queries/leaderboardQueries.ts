import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { leaderboardApi } from "../leaderboardApi";

export const useGetGlobalLeaderboard = () => {
  return useQuery({
    queryKey: [QueryKey.GET_LEADERBOARD_GLOBAL],
    queryFn: leaderboardApi.getGlobalLeaderboard,
  });
};
export const useGetLeaderboardById = (id: string) => {
  return useMutation({
    mutationKey: [QueryKey.GET_LEADERBOARD_ROOM, { id }],
    mutationFn: leaderboardApi.getRoomLeaderboard,
  });
};
