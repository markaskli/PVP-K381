using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("children")]
    public class Child : BaseModel
    {
        [PrimaryKey("id")]
        public string Id { get; set; } = null!;
        [Column("username")]
        public string Username { get; set; } = null!;
        [Column("name")]
        public string Name { get; set; } = null!;
        [Column("class")]
        public string Class { get; set; } = null!;
        [Column("email")]
        public string Email { get; set; } = null!;
        [Column("role_id")]
        public int RoleId { get; set; } = 2;
        [Column("parent_id")]
        public string ParentId { get; set; } = null!;
        [Column("invitation_code")]
        public string InvitationCode { get; set; } = null!;

    }
}
