using API.Extensions;
using API.Models;
using API.Models.DTOs.Leaderboard;
using Newtonsoft.Json;
using Supabase;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services.LeaderboardService
{
    public class LeaderboardService : ILeaderboardService
    {
        private readonly Client _supabaseClient;

        public LeaderboardService(Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<bool> GetLeaderboardByIdAsync(int id)
        {
            var leaderboard = await _supabaseClient.From<Leaderboard>()
                .Where(x => x.Id == id)
                .Single();

            if (leaderboard == null)
            {
                throw new KeyNotFoundException("No leaderboard was found");
            }

            return false;

        }

        public async Task<List<LeaderboardMemberDTO>?> GetGlobalLeaderboardMembers(string userToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var userId = jwtTokenObject.Subject;
            if (userId == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }


            var queryProps = new Dictionary<string, object>()
            {
                {"userid", userId }
            };
            var membersTable = await _supabaseClient.Rpc("get_global_leaderboard", queryProps);
            if (membersTable.Content == null || membersTable.Content.Length == 0)
            {
                return null;
            }

            List<LeaderboardMemberDTO> members = JsonConvert.DeserializeObject<List<LeaderboardMemberDTO>>(membersTable.Content);
            return members;
        }

        public async Task<List<LeaderboardMemberDTO>?> GetLeaderboardForRoom(string userToken, string roomId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var userId = jwtTokenObject.Subject;
            if (userId == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }


            var queryProps = new Dictionary<string, object>()
            {
                {"roomid", roomId },
                {"userid", userId }
            };
            var membersTable = await _supabaseClient.Rpc("get_leaderboard_of_room", queryProps);
            if (membersTable.Content == null || membersTable.Content.Length == 0)
            {
                return null;
            }

            List<LeaderboardMemberDTO> members = JsonConvert.DeserializeObject<List<LeaderboardMemberDTO>>(membersTable.Content);
            return members;
        }


    }
}
