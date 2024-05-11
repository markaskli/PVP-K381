using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("inventory_items")]
    public class InventoryItem : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [PrimaryKey("inventory_id")]
        public int InventoryId { get; set; }
        [PrimaryKey("product_id")]
        public int ProductId { get; set; }
        [Column("quantity")]
        public int Quantity { get; set; }
        [Reference(typeof(Product), useInnerJoin: true)]
        public Product Product { get; set; }

    }
}
