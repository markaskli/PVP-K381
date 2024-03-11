namespace API.Models.DTOs.Parent
{
    public class ChildRegistrationDataDTO
    {
        public required string InvitationCode { get; set; }
        public required string TempPassword { get; set; }
    }
}
