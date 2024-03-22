using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("rooms")]
    public class Room : BaseModel
    {
        [PrimaryKey("id")]
        public string Id { get; set; } = null!;
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("invitation_code")]
        public string InvitationCode { get; set; } = null!;
        [Column("created_by_id")]
        public string CreatedById { get; set; } = null!;
        [Reference(typeof(Child), useInnerJoin: false)]
        public List<Child> Children { get; set; } = new();
        [Reference(typeof(Task), useInnerJoin: false)]
        public List<Task> Tasks { get; set; } = new();
    }
}
