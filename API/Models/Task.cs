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
        public DateTime CreatedAt { get; set; }
        [Column("name")]
        public string Name { get; set; } = null!;
        [Column("description")]
        public string Description { get; set; } = null!;
        [Column("points")]
        public int Points { get; set; }
        [Column("is_finished")]
        public bool IsFinished { get; set; }
        [Column("due_date")]
        public DateTime DueDate { get; set; }
        [Column("created_by_id")]
        public string CreatedById { get; set; } = null!;
        [Column("assigned_to_id")]
        public string AssignedToId { get; set; } = null!;
    }
}
