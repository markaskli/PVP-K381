import axiosInstance from "../axios";

const BASE_URL = `http://10.0.2.2:5228/api/Leaderboard`;

export const leaderboardApi = {
  getGlobalLeaderboard: async () => {
    const result = await axiosInstance.get(`${BASE_URL}`);
    return result.data;
  },
  getRoomLeaderboard: async ({ id }: { id: string }) => {
    const result = await axiosInstance.get(`${BASE_URL}/${id}`);
    return result.data;
  },
};
