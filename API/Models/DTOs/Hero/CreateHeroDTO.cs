namespace API.Models.DTOs.Hero
{
    public class CreateHeroDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Health { get; set; }
        public int Cost { get; set; }
        public required IFormFile Image { get; set; }

    }
}
