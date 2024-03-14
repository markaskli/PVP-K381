namespace API.Models.DTOs.User
{
    public class ChangeUserPasswordDTO
    {
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
