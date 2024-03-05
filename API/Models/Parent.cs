using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("parents")]
    public class Parent : BaseModel
    {
        [PrimaryKey("id")]
        public string Id { get; set; } = null!;
        [Column("full_name")]
        public string FullName { get; set; } = null!;
        [Column("email")]
        public string Email { get; set; } = null!;
        [Column("profile_picture_url")]
        public string ProfilePictureUrl { get; set; } = null!;

        [Reference(typeof(Child))]
        public List<Child> Children { get; set; } = new List<Child>();
        
    }
}
