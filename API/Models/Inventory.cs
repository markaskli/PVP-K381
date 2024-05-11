using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("inventory")]
    public class Inventory : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("child_id")]
        public string ChildId { get; set; } = null!;
        [Reference(typeof(InventoryItem), useInnerJoin: true)]
        public List<InventoryItem> Items { get; set; } = new();
    }
}
