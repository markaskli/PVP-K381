namespace API.Models.DTOs.Inventory
{
    public class GetInventoryItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public int HealthChange { get; set; }
        public int Quantity { get; set; }
        public int Cost { get; set; }


    }
}
