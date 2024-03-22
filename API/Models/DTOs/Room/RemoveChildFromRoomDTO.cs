namespace API.Models.DTOs.Room
{
    public class RemoveChildFromRoomDTO
    {
        public required string UserId { get; set; }
        public required string ChildId { get; set; }
    }
}
