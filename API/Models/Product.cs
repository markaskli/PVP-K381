using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("products")]
    public class Product : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; } = null!;
        [Column("description")]
        public string? Description { get; set; }
        [Column("health_change")]
        public int HealthChange { get; set; }
    }
}
