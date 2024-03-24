namespace API.Models.DTOs.Task
{
    public class CreateTaskForRoomDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Points { get; set; }
        public required string DueDate { get; set; }
        public required string AssignToRoomId { get; set; }
    }
}
