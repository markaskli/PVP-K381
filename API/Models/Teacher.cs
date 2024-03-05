using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("teachers")]
    public class Teacher : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("name")]
        public required string Name { get; set; }
        [Column("surname")]
        public required string Surname { get; set; } 
        [Column("email")]
        public required string Email { get; set; } 
        
        

    }
}
