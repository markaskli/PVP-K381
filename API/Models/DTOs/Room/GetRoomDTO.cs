using API.Models.DTOs.Child;
using API.Models.DTOs.Task;
using API.Models.DTOs.User;

namespace API.Models.DTOs.Room
{
    public class GetRoomDTO
    {
        public required string Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required string Name { get; set; }
        public required string InvitationCode { get; set; }
        public required string CreatedBy { get; set; }
        public List<GetChildDTO> Children { get; set; } = new();
        public List<GetTaskStatusDTO> Tasks { get; set; } = new();
    }
}
