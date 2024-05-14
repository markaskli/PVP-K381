using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("acquired_heroes")]
    public class AcquiredHero : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [PrimaryKey("child_id", shouldInsert: true)]
        public string ChildId { get; set; }
        [PrimaryKey("hero_id", shouldInsert: true)]
        public int HeroId { get; set; }
        [Column("current_health")]
        public int CurrentHealth { get; set; }
        [Reference(typeof(Hero), useInnerJoin: true)]
        public Hero Hero { get; set; }
    }
}
