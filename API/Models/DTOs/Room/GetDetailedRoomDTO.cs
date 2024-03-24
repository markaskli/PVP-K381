using Newtonsoft.Json;

namespace API.Models.DTOs.Room
{
    public class GetDetailedRoomDTO
    {
        public required string Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required string InvitationCode { get; set; }
        public required string CreatorName { get; set; }
        public required string CreatorSurname { get; set; }

    }
}
