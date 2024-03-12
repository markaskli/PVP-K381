namespace API.Models.DTOs.Task
{
    public class GetTaskDTO
    {
        public int Id { get; set; }
        public required string CreatedAt { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; } 
        public int Points { get; set; }
        public bool IsFinished { get; set; }
        public required string DueDate { get; set; }
        public required string CreatedById { get; set; }
        public required string AssignedToId { get; set; }
    }
}
