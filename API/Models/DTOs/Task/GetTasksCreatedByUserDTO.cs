using Newtonsoft.Json;

namespace API.Models.DTOs.Task
{
    public class GetTasksCreatedByUserDTO
    {
        [JsonProperty("id")]
        public required int Id { get; set; }
        [JsonProperty("task_id")]
        public required int TaskId { get; set; }
        [JsonProperty("username")]
        public string? ChildUsername { get; set; }
        [JsonProperty("is_finished")]
        public bool IsFinished { get; set; } = false;
        [JsonProperty("assigned_at")]
        public required DateTime AssignedAt { get; set; }
        [JsonProperty("completed_at")]
        public DateTime? CompletedAt { get; set; }
        [JsonProperty("due_date")]
        public DateTime DueDate { get; set; }
        [JsonProperty("room_name")]
        public string? RoomName { get; set; }
        [JsonProperty("task_name")]
        public required string TaskName { get; set; }
        [JsonProperty("description")]
        public required string Description { get; set; }
        [JsonProperty("points")]
        public required int Points { get; set; }


    }
}
