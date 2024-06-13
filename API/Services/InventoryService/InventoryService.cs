using API.Models;
using API.Models.DTOs.Inventory;

namespace API.Services.InventoryService
{
    public class InventoryService : IInventoryService
    {
        private readonly Supabase.Client _supabaseClient;

        public InventoryService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<GetIventoryDTO?> AddItemToInventoryAsync(int productId, string userId, int quantity = 1)
        {
            if (quantity == 0)
            {
                return null;
            }

            var child = await _supabaseClient.From<Child>()
                .Where(x => x.Id == userId)
                .Single();

            if (child == null)
            {
                return null;
            }

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

                userInventory = response.Model;
            }

            var inventoryProduct = userInventory.Items.Find(x => x.ProductId == productId);

            if (inventoryProduct != null)
            {
                child.Points -= inventoryProduct.Product.Cost * quantity;
                if (child.Points < 0)
                {
                    throw new ArgumentException("User does not have enough points to purchase this item.");
                }
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

                child.Points -= product.Cost * quantity;
                if(child.Points < 0)
                {
                    throw new ArgumentException("User does not have enough points to purchase this item.");
                }

                inventoryProduct = new InventoryItem()
                {
                    InventoryId = userInventory.Id,
                    Product = product,
                    ProductId = product.Id,
                    Quantity = quantity
                };

                userInventory.Items.Add(inventoryProduct);
            }

            var result = await _supabaseClient.From<InventoryItem>()
                .Upsert(inventoryProduct);

            var userResult = await _supabaseClient.From<Child>()
                .Update(child);



            return new GetIventoryDTO()
            {
                Id = userInventory.Id,
                Items = userInventory.Items.Select(it => new GetInventoryItemDTO()
                {
                    Id = it.ProductId,
                    Name = it.Product.Name,
                    Description = it.Product.Description,
                    PictureUrl = _supabaseClient.Storage.From("product-images").GetPublicUrl($"product-{it.ProductId}.png"),
                    HealthChange = it.Product.HealthChange,
                    Quantity = it.Quantity,
                    Cost = it.Product.Cost
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

            var inventoryItem = userInventory.Items.Find(x => x.ProductId == productId);
            if (inventoryItem == null)
            {
                return null;
            }

            inventoryItem.Quantity -= quatity;
            if (inventoryItem.Quantity <= 0)
            {
                userInventory.Items.Remove(inventoryItem);
                await _supabaseClient.From<InventoryItem>()
                    .Where(x => x.InventoryId == inventoryItem.InventoryId && x.ProductId == inventoryItem.ProductId)
                    .Delete();
            }
            else
            {
                var result = await _supabaseClient.From<InventoryItem>()
                    .Where(x => x.InventoryId == inventoryItem.InventoryId && x.ProductId == inventoryItem.ProductId)
                    .Set(x => x.Quantity, inventoryItem.Quantity)
                    .Update();
            }

            return new GetIventoryDTO()
            {
                Id = userInventory.Id,
                Items = userInventory.Items.Select(it => new GetInventoryItemDTO()
                {
                    Id = it.ProductId,
                    Name = it.Product.Name,
                    Description = it.Product.Description,
                    PictureUrl = _supabaseClient.Storage.From("product-images").GetPublicUrl($"product-{it.ProductId}.png"),
                    HealthChange = it.Product.HealthChange,
                    Quantity = it.Quantity,
                    Cost = it.Product.Cost
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
                    PictureUrl = _supabaseClient.Storage.From("product-images").GetPublicUrl($"product-{it.ProductId}.png"),
                    HealthChange = it.Product.HealthChange,
                    Quantity = it.Quantity,
                    Cost = it.Product.Cost
                }).ToList()
            };


        }
    }
}
