using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("leaderboard")]
    public class Leaderboard : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("score")]
        public int Score { get; set; }
        [Column("rank")]
        public int Rank { get; set; }
        [Column("player_id")]
        public string PlayerId { get; set; } = null!;
    }
}
