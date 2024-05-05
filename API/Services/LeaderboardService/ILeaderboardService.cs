using API.Models.DTOs.Leaderboard;

namespace API.Services.LeaderboardService
{
    public interface ILeaderboardService
    {
        Task<List<LeaderboardMemberDTO>?> GetGlobalLeaderboardMembers(string userToken);
        Task<List<LeaderboardMemberDTO>?> GetLeaderboardForRoom(string userToken, string roomId);
    }
}