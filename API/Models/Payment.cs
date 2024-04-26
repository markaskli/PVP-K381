using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("payments")]
    public class Payment : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("user_id")]
        public string UserId { get; set; } = null!;
        [Column("payment_intent")]
        public string PaymentIntent { get; set; } = null!;
        [Column("ordered_points")]
        public int Points { get; set; }

    }
}
