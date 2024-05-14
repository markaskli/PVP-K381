using API.Models;
using API.Models.DTOs.Hero;

namespace API.Services.HeroService
{
    public interface IHeroService
    {
        Task<GetAcquiredHeroDTO?> ChangeHealth(int id, string childId, int productId);
        Task<GetHeroDTO> CreateHero(CreateHeroDTO request);
        Task<GetAcquiredHeroDTO?> GetAcquiredHero(int id, string childId);
        Task<GetHeroDTO?> GetHeroById(int id);
        Task<List<GetHeroDTO>?> GetHeroes();
        Task<List<GetAcquiredHeroDTO>?> GetHeroesOfChild(string childId);
        Task<GetAcquiredHeroDTO?> PurchaseHero(int heroId, string childId);
    }
}