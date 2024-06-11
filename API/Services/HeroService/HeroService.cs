using API.Models;
using API.Models.DTOs.Hero;
using API.Models.DTOs.Product;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;

namespace API.Services.HeroService
{
    public class HeroService : IHeroService
    {
        private readonly Supabase.Client _supabaseClient;

        public HeroService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<GetHeroDTO> CreateHero(CreateHeroDTO request)
        {
            using var memorySteam = new MemoryStream();
            await request.Image.CopyToAsync(memorySteam);


            var hero = new Hero()
            {
                Name = request.Name,
                Cost = request.Cost,
                Description = request.Description,
                Health = request.Health,
            };

            var result = await _supabaseClient.From<Hero>()
                .Insert(hero);

            await _supabaseClient.Storage.From("hero-images").Upload(memorySteam.ToArray(), $"hero-{result.Model.Id}.gif");

            return new GetHeroDTO()
            {
                Id = result.Model.Id,
                Name = result.Model.Name,
                Cost = result.Model.Cost,
                Description = result.Model.Description,
                Health = result.Model.Health,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{result.Model.Id}.gif")
            };

        }

        public async Task<List<GetHeroDTO>?> GetHeroes()
        {
            var heroes = await _supabaseClient.From<Hero>()
                .Get();

            if (heroes.Models.Count == 0)
            {
                return null;
            }

            List<GetHeroDTO> heroesList = new();
            foreach (Hero hero in heroes.Models)
            {
                heroesList.Add(new GetHeroDTO()
                {
                    Id = hero.Id,
                    Name = hero.Name,
                    Cost = hero.Cost,
                    Description = hero.Description,
                    Health = hero.Health,
                    HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{hero.Id}.gif")
                });
            }

            return heroesList;

        }

        public async Task<GetHeroDTO?> GetHeroById(int id)
        {
            var hero = await _supabaseClient.From<Hero>()
                .Where(x => x.Id == id)
                .Single();

            if (hero == null)
            {
                return null;
            }

            return new GetHeroDTO()
            {
                Id = hero.Id,
                Name = hero.Name,
                Cost = hero.Cost,
                Description = hero.Description,
                Health = hero.Health,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{hero.Id}.gif")
            };
        }

        public async Task<List<GetAcquiredHeroDTO>?> GetHeroesOfChild(string childId)
        {
            var heroes = await _supabaseClient.From<AcquiredHero>()
                .Where(ah => ah.ChildId == childId)
                .Get();

            if (heroes.Models.Count == 0)
            {
                return null;
            }

            return heroes.Models.Select(h => new GetAcquiredHeroDTO()
            {
                AcquiredHeroId = h.Id,
                Name = h.Hero.Name,
                Description = h.Hero.Description,
                Health = h.CurrentHealth,
                Cost = h.Hero.Cost,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{h.Hero.Id}.gif")
            }).ToList();
        }

        public async Task<GetAcquiredHeroDTO?> GetAcquiredHero(int id, string childId)
        {
            var acquiredHero = await _supabaseClient.From<AcquiredHero>()
                .Where(ah => ah.Id == id && ah.ChildId == childId)
                .Single();

            if (acquiredHero == null)
            {
                return null;
            }

            return new GetAcquiredHeroDTO()
            {
                AcquiredHeroId = acquiredHero.Id,
                Name = acquiredHero.Hero.Name,
                Description = acquiredHero.Hero.Description,
                Health = acquiredHero.CurrentHealth,
                Cost = acquiredHero.Hero.Cost,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{acquiredHero.Hero.Id}.gif")
            };
        }


        public async Task<GetAcquiredHeroDTO?> PurchaseHero(int heroId, string childId)
        {
            var hero = await _supabaseClient.From<Hero>()
                .Where(h => h.Id == heroId)
                .Single();

            if (hero == null)
            {
                return null;
            }

            var child = await _supabaseClient.From<Child>()
                .Where(c => c.Id == childId)
                .Single();

            if (child == null)
            {
                return null;
            }

            if (child.Points < hero.Cost)
            {
                throw new ArgumentException("User does not have enough points to purchase the hero.");
            }

            var updatedChildPoints = child.Points - hero.Cost;
            child.Points = updatedChildPoints;
            await child.Update<Child>();

            var purchasedHero = new AcquiredHero()
            {
                ChildId = childId,
                HeroId = hero.Id,
                CurrentHealth = hero.Health
            };

            var response = await _supabaseClient.From<AcquiredHero>().Insert(purchasedHero);
            return new GetAcquiredHeroDTO()
            {
                AcquiredHeroId = response.Model.Id,
                Name = hero.Name,
                Description = hero.Description,
                Cost = hero.Cost,
                Health = purchasedHero.CurrentHealth,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{response.Model.Id}.gif")
            };
        }

        public async Task<GetAcquiredHeroDTO?> ChangeHealth(int id, string childId, int productId)
        {
            var acquiredHero = await _supabaseClient.From<AcquiredHero>()
                .Where(ah => ah.Id == id && ah.ChildId == childId)
                .Single();

            if (acquiredHero == null)
            {
                return null;
            }

            var userInventory = await _supabaseClient.From<Inventory>()
                .Where(x => x.ChildId == childId)
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

            //var product = await _supabaseClient.From<Product>()
            //    .Where(p => p.Id == productId)
            //    .Single();

            //if (product == null)
            //{
            //    return null;
            //}

            acquiredHero.CurrentHealth += inventoryItem.Product.HealthChange;
            if (acquiredHero.CurrentHealth <= 0)
            {
                await _supabaseClient.From<AcquiredHero>()
                    .Where(x => x.Id == id)
                    .Delete();

                return null;
            }

            inventoryItem.Quantity -= 1;
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

            await acquiredHero.Update<AcquiredHero>();

            return new GetAcquiredHeroDTO()
            {
                AcquiredHeroId = acquiredHero.Id,
                Name = acquiredHero.Hero.Name,
                Description = acquiredHero.Hero.Description,
                Cost = acquiredHero.Hero.Cost,
                Health = acquiredHero.CurrentHealth,
                HeroPng = _supabaseClient.Storage.From("hero-images").GetPublicUrl($"hero-{acquiredHero.Hero.Id}.gif")
            };
        }

    }
}
