namespace API.Models.DTOs.User
{
    public class GetUserInformationDTO
    {
        public required string Id { get; set; }
        public required string FullName { get; set; }
        public required string ProfilePictureUrl { get; set; }
        public required string Email { get; set; }


    }
}
