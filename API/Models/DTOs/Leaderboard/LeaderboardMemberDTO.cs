using Newtonsoft.Json;

namespace API.Models.DTOs.Leaderboard
{
    public class LeaderboardMemberDTO
    {
        [JsonProperty("id")]
        public required string ChildId { get; set; }
        [JsonProperty("points")]
        public required int Points { get; set; }
        [JsonProperty("name")]
        public string? Name { get; set; }
        [JsonProperty("rank")]
        public int Rank { get; set; }
    }
}
