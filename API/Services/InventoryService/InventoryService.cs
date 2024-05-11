using API.Models;
using API.Models.DTOs.Inventory;
using Supabase;

namespace API.Services.InventoryService
{
    public class InventoryService : IInventoryService
    {
        private readonly Client _supabaseClient;

        public InventoryService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<GetIventoryDTO?> AddItemToInventoryAsync(int productId, string userId, int quantity = 1)
        {
            var userInventory = await _supabaseClient.From<Inventory>()
                .Where(x => x.ChildId == userId)
                .Single();

            if (userInventory == null)
            {
                userInventory = new Inventory()
                {
                    ChildId = userId,
                };
                var response = await _supabaseClient.From<Inventory>()
                    .Insert(userInventory);
            }

            var inventoryProduct = userInventory.Items.Find(x => x.ProductId == productId);

            if (inventoryProduct != null)
            {
                inventoryProduct.Quantity += quantity;
            }
            else
            {
                var product = await _supabaseClient.From<Product>()
                    .Where(x => x.Id == productId)
                    .Single();

                if (product == null)
                {
                    return null;
                }

                userInventory.Items.Add(new InventoryItem()
                {
                    InventoryId = userInventory.Id,
                    ProductId = product.Id,
                    Quantity = quantity
                });
            }

            var result = await _supabaseClient.From<InventoryItem>()
                .Insert(userInventory.Items);


            return new GetIventoryDTO()
            {
                Id = userInventory.Id,
                Items = userInventory.Items.Select(it => new GetInventoryItemDTO()
                {
                    Id = it.ProductId,
                    Name = it.Product.Name,
                    Description = it.Product.Description,
                    HealthChange = it.Product.HealthChange
                }).ToList()
            };

        }

        public async Task<GetIventoryDTO?> RemoveItemFromInventoryAsync(int productId, string userId, int quatity = 1)
        {
            var userInventory = await _supabaseClient.From<Inventory>()
                .Where(x => x.ChildId == userId)
                .Single();

            if (userInventory == null)
            {
                return null;
            }

            var product = userInventory.Items.Find(x => x.ProductId == productId);
            if (product == null)
            {
                return null;
            }

            product.Quantity -= quatity;
            if (product.Quantity <= 0)
            {
                userInventory.Items.Remove(product);
            }

            var result = await userInventory.Update<Inventory>();
            return new GetIventoryDTO()
            {
                Id = userInventory.Id,
                Items = userInventory.Items.Select(it => new GetInventoryItemDTO()
                {
                    Id = it.ProductId,
                    Name = it.Product.Name,
                    Description = it.Product.Description,
                    HealthChange = it.Product.HealthChange
                }).ToList()
            };

        }

        public async Task<GetIventoryDTO?> GetInventoryItemsAsync(string userId)
        {
            var inventory = await _supabaseClient.From<Inventory>()
                .Where(x => x.ChildId == userId)
                .Single();

            if (inventory == null)
            {
                return null;
            }

            return new GetIventoryDTO()
            {
                Id = inventory.Id,
                Items = inventory.Items.Select(it => new GetInventoryItemDTO()
                {
                    Id = it.ProductId,
                    Name = it.Product.Name,
                    Description = it.Product.Description,
                    HealthChange = it.Product.HealthChange
                }).ToList()
            };


        }
    }
}
