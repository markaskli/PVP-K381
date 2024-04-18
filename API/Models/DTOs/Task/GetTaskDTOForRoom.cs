namespace API.Models.DTOs.Task
{
    public class GetTaskDTOForRoom
    {
        public int Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Points { get; set; }
        public required DateTime DueDate { get; set; }
        public required string CreatedById { get; set; }
        public List<string> AssignedToIds { get; set; } = new();


    }
}
