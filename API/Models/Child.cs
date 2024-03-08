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
        public string Username { get; set; } = null!;
        [Column("role_id")]
        public int RoleId { get; set; } = 2;
        [Reference(typeof(Parent))]
        public Parent Parent { get; set; }

        public Child()
        {
            Parent = new Parent();
        }
    }
}
