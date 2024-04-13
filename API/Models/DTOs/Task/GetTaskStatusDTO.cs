namespace API.Models.DTOs.Task
{
    public class GetTaskStatusDTO
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; } 
        public int Points { get; set; }
        public bool IsConfirmedByChild { get; set; }
        public bool IsConfirmedByParent { get; set; }
        public required DateTime DueDate { get; set; }
        public required string CreatedById { get; set; }
        public string AssignedToChildId { get; set; }
        public bool IsFinished { get; set; }
        public DateTime? CompletedAt { get; set; }

    }
}
