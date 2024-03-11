using API.Exceptions;
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
            try
            {
                var session = await _userService.SignIn(request);
                var result = session.MapSessionToUserDTO();
                if (result == null)
                {
                    return StatusCode(500, "An error occurred while trying to parse the information.");
                }

                return Ok(result);
            }
            catch (SignInFailedException ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("childSignIn")]
        public async Task<ActionResult> SignInChild(ChildSignInDTO request)
        {
            try
            {
                var result = await _userService.SignInChild(request);
                var user = result.MapSessionToChildDTO();
                if (result == null)
                {
                    return StatusCode(500, "An error occurred while trying to parse the information.");
                }
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(SignInFailedException ex)
            {
                return StatusCode(500, ex.Message);
            }         
            
        }
    }
}
