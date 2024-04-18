using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("users")]
    public class Users : BaseModel
    {
        [Column("id")]
        public string Id { get; set; } = null!;
        [Column("email")]
        public string Email { get; set; } = null!;
        [Column("raw_user_meta_data")]
        public UserData RawUserData { get; set; }
    }
}
