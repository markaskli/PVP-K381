namespace API.Models.DTOs.User
{
    public class UserSignInDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
