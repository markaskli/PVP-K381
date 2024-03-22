using Newtonsoft.Json;

namespace API.Models
{
    public class RoomDetailed
    {
        [JsonProperty("id")]
        public string Id { get; set; } = null!;
        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; } 
        [JsonProperty("invitation_code")]
        public string InvitationCode { get; set; } = null!;
        [JsonProperty("creator_name")]
        public string CreatorName { get; set; } = null!;
        [JsonProperty("creator_surname")]
        public string CreatorSurname { get; set; } = null!;
    }
}
