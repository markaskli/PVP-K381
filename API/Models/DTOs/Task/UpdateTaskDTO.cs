namespace API.Models.DTOs.Task
{
    public class UpdateTaskDTO
    {
        public required int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? Points { get; set; }
        public string? DueDate { get; set; }
        public string? AssignedToId { get; set; } 
        public bool? IsFinished { get; set; }
    }
}
