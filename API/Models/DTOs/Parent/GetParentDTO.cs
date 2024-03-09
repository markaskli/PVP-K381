namespace API.Models.DTOs.Parent
{
    public class GetParentDTO
    {
        public required string Id { get; set; }
        public required string FullName { get; set; }
        public required string ProfilePictureUrl { get; set; }
        public required string Email { get; set; }
    }
}
