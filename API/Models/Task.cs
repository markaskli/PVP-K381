using Newtonsoft.Json;
using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("tasks")]
    public class Task : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("created_at")]
        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("name")]
        [JsonProperty("name")]
        public string Name { get; set; } = null!;
        [Column("description")]
        [JsonProperty("description")]
        public string Description { get; set; } = null!;
        [Column("points")]
        [JsonProperty("points")]
        public int Points { get; set; }
        [Column("is_confirmed_by_child")]
        [JsonProperty("is_confirmed_by_child")]
        public bool IsConfirmedByChild { get; set; }
        [Column("is_confirmed_by_user")]
        [JsonProperty("is_confirmed_by_user")]
        public bool IsConfirmedByUser { get; set; }
        [Column("due_date")]
        [JsonProperty("due_date")]
        public DateTime DueDate { get; set; }
        [Column("created_by_id")]
        [JsonProperty("created_by_id")]
        public string CreatedById { get; set; } = null!;
        [Column("assigned_to_id")]
        [JsonProperty("assigned_to_id")]
        public string? AssignedToChildId { get; set; }
        [Column("assigned_to_room")]
        [JsonProperty("assigned_to_room")]
        public string? AssignedToRoom { get; set; } 
    }
}
