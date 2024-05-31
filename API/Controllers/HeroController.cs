using API.Models.DTOs.Hero;
using API.Services.HeroService;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeroController : ControllerBase
    {
        private readonly IHeroService _heroService;

        public HeroController(IHeroService heroService)
        {
            _heroService = heroService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetHeroDTO>>> GetHeroes()
        {
            var heroes = await _heroService.GetHeroes();
            if (heroes == null)
            {
                return NotFound();
            }

            return Ok(heroes);
        }

        [HttpGet("child")]
        [Authorize]
        public async Task<ActionResult<List<GetAcquiredHeroDTO>>> GetHeroesOfChild()
        {
            var childId = AuthUtilies.GetUserId(HttpContext);
            if (childId == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "Could not get user ID from provided token." });
            }

            var heroes = await _heroService.GetHeroesOfChild(childId);
            if (heroes == null)
            {
                return NotFound();
            }

            return Ok(heroes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetHeroDTO>> GetHero(int id)
        {
            var hero = await _heroService.GetHeroById(id);
            if (hero == null)
            {
                return NotFound(new ProblemDetails() {  Detail = "Hero with provided ID does not exist."});
            }

            return Ok(hero);
        }

        [HttpGet("acquired/{id}")]
        [Authorize]
        public async Task<ActionResult<GetAcquiredHeroDTO>> GetAcquiredHero(int id)
        {
            var childId = AuthUtilies.GetUserId(HttpContext);
            if (childId == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "Could not get user ID from provided token." });
            }

            var hero = await _heroService.GetAcquiredHero(id, childId);
            if (hero == null)
            {
                return NotFound(new ProblemDetails() { Detail = "Acquired hero with provided ID does not exist or does not belong to the user." });
            }

            return Ok(hero);
        }

        [HttpPost]
        public async Task<ActionResult<GetHeroDTO>> CreateHero([FromForm] CreateHeroDTO request)
        {
            var hero = await _heroService.CreateHero(request);
            return Ok(hero);
        }

        [HttpPost("acquire/{id}")]
        [Authorize]
        public async Task<ActionResult<GetAcquiredHeroDTO>> PurchaseHero(int id)
        {
            try
            {
                var childId = AuthUtilies.GetUserId(HttpContext);
                if (childId == null)
                {
                    return BadRequest(new ProblemDetails() { Detail = "Could not get user ID from provided token." });
                }

                var result = await _heroService.PurchaseHero(id, childId);
                if (result == null)
                {
                    return BadRequest(new ProblemDetails() { Detail = "Invalid hero or child ID provided" });
                }

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
        }

        [HttpPatch]
        [Authorize]
        public async Task<ActionResult> UpdateHealth(int id, int productId)
        {
            var childId = AuthUtilies.GetUserId(HttpContext);
            if (childId == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "Could not get user ID from provided token." });
            }

            var response = await _heroService.ChangeHealth(id, childId, productId);
            if (response == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "Invalid hero ID provided or the hero does not belong to the user." });
            }

            return Ok(response);

        }
    }
}
