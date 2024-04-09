namespace API.Models.DTOs.Child
{
    public class GetChildOfParentDTO
    {
        public required string Id { get; set; }
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Class { get; set; }
        public required string InvitationCode { get; set; }
        public required bool HasJoined { get; set; }
    }
}
