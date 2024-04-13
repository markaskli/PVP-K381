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
        [Column("name")]
        public string Name { get; set; } = null!;
        [Column("description")]
        public string Description { get; set; } = null!;
        [Column("points")]
        public int Points { get; set; }
        [Column("due_date")]
        public DateTime DueDate { get; set; }
    }
}
