using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("heroes")]
    public class Hero : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("health")]
        public int Health { get; set; }
        [Column("cost")]
        public int Cost { get; set; }
    
    }
}
