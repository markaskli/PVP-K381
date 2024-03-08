namespace API.Models.DTOs.Parent
{
    public class CreateParentDTO
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public required string ProfilePictureUrl { get; set; }
        
        
    }
}
