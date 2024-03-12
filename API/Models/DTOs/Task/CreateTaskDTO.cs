using Postgrest.Attributes;

namespace API.Models.DTOs.Task
{
    public class CreateTaskDTO
    {
        public required string Name { get; set; } 
        public required string Description { get; set; }
        public int Points { get; set; }
        public required string DueDate { get; set; }
        public string AssignedToId { get; set; } = null!;
    }
}
