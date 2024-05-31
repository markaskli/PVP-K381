namespace API.Models.DTOs.Inventory
{
    public class GetIventoryDTO
    {
        public int Id { get; set; }
        public List<GetInventoryItemDTO> Items { get; set; } = new List<GetInventoryItemDTO>();
    }
}
