using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("rooms")]
    public class Room : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        public Parent? Parent { get; set; }
        public Teacher? Teacher { get; set; }
        public List<Child> Children { get; set; } = new List<Child>();
    }
}
