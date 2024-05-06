using API.Models.DTOs.Product;

namespace API.Services.ProductService
{
    public interface IProductService
    {
        Task<GetProductDTO> AddProduct(CreateProductDTO request);
        Task<bool> DeleteProductById(int productId);
        Task<GetProductDTO?> GetProductById(int productId);
    }
}