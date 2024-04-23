namespace API.Models.DTOs.User
{
    public class GetUserInformationDTO
    {
        public required string Id { get; set; }
        public required string Token { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string ProfilePictureUrl { get; set; }
        public required int Points { get; set; }
        public int RoleId { get; set; }
        

    }
}
