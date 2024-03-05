using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("children")]
    public class Child : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("username")]
        public required string Username { get; set; }
        [Reference(typeof(Parent))]
        public required Parent Parent { get; set; }
    }
}
