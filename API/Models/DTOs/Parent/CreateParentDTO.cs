namespace API.Models.DTOs.Parent
{
    public class CreateParentDTO
    {
        public required string FullName { get; set; }
        public required string ProfilePictureUrl { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
