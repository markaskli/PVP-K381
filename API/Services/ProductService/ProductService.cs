using API.Models;
using API.Models.DTOs.Product;
using Supabase;

namespace API.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly Client _supabaseClient;

        public ProductService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<GetProductDTO> AddProduct(CreateProductDTO request)
        {
            using var memorySteam = new MemoryStream();
            await request.Image.CopyToAsync(memorySteam);


            var product = new Product()
            {
                Name = request.Name,
                Description = request.Description,
                HealthChange = request.HealthChange,
            };

            var result = await _supabaseClient.From<Product>()
                .Insert(product);

            await _supabaseClient.Storage.From("product-images").Upload(memorySteam.ToArray(), $"product-{result.Model.Id}.png");

            return new GetProductDTO()
            {
                Id = result.Model.Id,
                Name = result.Model.Name,
                Description = result.Model.Description,
                HealthChange = result.Model.HealthChange,
                PictureUrl = _supabaseClient.Storage.From("product-images").GetPublicUrl($"product-{result.Model.Id}.png")
            };
        }

        public async Task<GetProductDTO?> GetProductById(int productId)
        {
            var product = await _supabaseClient.From<Product>()
                .Where(x => x.Id == productId)
                .Single();

            if (product == null)
            {
                return null;
            }

            var image = _supabaseClient.Storage.From("product-images").GetPublicUrl($"product-{product.Id}.png");

            return new GetProductDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                HealthChange = product.HealthChange,
                PictureUrl = image
            };
        }

        public async Task<bool> DeleteProductById(int productId)
        {
            await _supabaseClient.From<Product>()
                .Where(x => x.Id == productId)
                .Delete();

            await _supabaseClient.Storage
                .From("product-images")
                .Remove(new List<string> { $"product-{productId}.png" });

            return true;
        }
    }
}
