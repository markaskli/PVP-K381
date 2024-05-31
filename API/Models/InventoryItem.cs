using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("inventory_items")]
    public class InventoryItem : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [PrimaryKey("inventory_id", shouldInsert: true)]
        public int InventoryId { get; set; }
        [PrimaryKey("product_id", shouldInsert: true)]
        public int ProductId { get; set; }
        [Column("quantity", NullValueHandling = 0)]
        public int Quantity { get; set; }
        [Reference(typeof(Product), useInnerJoin: true)]
        public Product Product { get; set; }

    }
}
