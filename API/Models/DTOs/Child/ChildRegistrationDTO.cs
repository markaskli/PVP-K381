namespace API.Models.DTOs.Child
{
    public class ChildRegistrationDTO
    {
        public required string Username { get; set; }
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
        public required string RegistrationCode { get; set; }
    }
}
