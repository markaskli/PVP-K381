using API.Models.DTOs.Inventory;

namespace API.Services.InventoryService
{
    public interface IInventoryService
    {
        Task<GetIventoryDTO?> AddItemToInventoryAsync(int productId, string userId, int quantity = 1);
        Task<GetIventoryDTO?> GetInventoryItemsAsync(string userId);
        Task<GetIventoryDTO?> RemoveItemFromInventoryAsync(int productId, string userId, int quatity = 1);
    }
}