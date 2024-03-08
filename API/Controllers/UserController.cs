using API.Extensions;
using API.Models.DTOs.Child;
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
            var session = await _userService.SignIn(request);
            if (session == null)
            {
                return BadRequest("An error occurred while trying to sign in.");
            }

            var result = session.MapSessionToUserDTO();

            if (result == null)
            {
                return BadRequest("An error occurred while trying to parse the information.");
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> SignInChild(ChildSignInDTO request)
        {
            return null;
        }
    }
}
