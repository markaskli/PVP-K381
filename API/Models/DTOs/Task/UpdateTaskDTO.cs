namespace API.Models.DTOs.Task
{
    public class UpdateTaskDTO
    {
        public required int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? Points { get; set; }
        public DateTime? DueDate { get; set; }
        public bool? IsConfirmedByChild { get; set; }
        public bool? IsConfirmedByUser { get; set; }

    }
}
