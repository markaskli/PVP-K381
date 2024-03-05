using API.Extensions;
using API.Models.DTOs.User;
using API.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signIn")]
        public async Task<ActionResult> SignIn(UserSignInDTO request)
        {
            var result = await _userService.SignIn(request);
            if (result == null)
            {
                return BadRequest("An error occurred while trying to sign in.");
            }
            return Ok(result.User.MapUserToDTO());
        }
    }
}
