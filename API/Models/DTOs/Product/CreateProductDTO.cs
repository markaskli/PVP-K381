namespace API.Models.DTOs.Product
{
    public class CreateProductDTO
    {
        public required string Name { get; set; }
        public string Description { get; set; }
        public int HealthChange { get; set; }
        public IFormFile Image { get; set; }
    }
}
