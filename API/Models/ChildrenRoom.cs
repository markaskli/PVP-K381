using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("children_room")]
    public class ChildrenRoom : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [PrimaryKey("child_id")]
        public string ChildId { get; set; } = null!;
        [PrimaryKey("room_id")]
        public string RoomId { get; set; } = null!;

    }
}
