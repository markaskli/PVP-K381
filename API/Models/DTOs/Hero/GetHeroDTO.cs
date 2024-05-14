namespace API.Models.DTOs.Hero
{
    public class GetHeroDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Health { get; set; }
        public string HeroPng { get; set; }
        public int Cost { get; set; }
    }
}
