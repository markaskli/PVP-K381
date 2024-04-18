namespace API.Models.DTOs.User
{
    public class GetChildInformationDTO
    {
        public required string Id { get; set; }
        public required string Token { get; set; }
        public required string Username { get; set; }
        public int RoleId { get; set; }
        public int Points { get; set; }

    }
}
