namespace API.Models.DTOs.Room
{
    public class CreatedRoomDTO
    {
        public required string CreatedAt { get; set; }
        public required string CreatedBy { get; set; }
        public required string InvitationCode { get; set; }
    }
}
