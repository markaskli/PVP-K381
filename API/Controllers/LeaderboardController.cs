using API.Models.DTOs.Leaderboard;
using API.Services.LeaderboardService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaderboardController : ControllerBase
    {
        private readonly ILeaderboardService _leaderboardService;

        public LeaderboardController(ILeaderboardService leaderboardService)
        {
            _leaderboardService = leaderboardService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<LeaderboardMemberDTO>>> GetGlobalLeaderboard()
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            var members = await _leaderboardService.GetGlobalLeaderboardMembers(userToken);
            if (members.IsNullOrEmpty())
            {
                return BadRequest(new ProblemDetails() { Detail = "There are no entries currently." });
            }
            return Ok(members);
        }

        [HttpGet("{roomId}")]
        [Authorize]
        public async Task<ActionResult<List<LeaderboardMemberDTO>>> GetLeaderboardForRoom(string roomId)
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            var members = await _leaderboardService.GetLeaderboardForRoom(userToken, roomId);
            if (members.IsNullOrEmpty())
            {
                return BadRequest(new ProblemDetails() { Detail = "No data for specified room was found." });
            }
            return Ok(members);
        }

    }
}
