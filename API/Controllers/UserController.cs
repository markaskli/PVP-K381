using API.Exceptions;
using API.Extensions;
using API.Models.DTOs.User;
using API.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Postgrest.Exceptions;
using Supabase.Gotrue.Exceptions;

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

        [HttpGet("points")]
        public async Task<ActionResult> GetPointsOfUser(string userId)
        {
            var result = await _userService.GetPointsOfUser(userId);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
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
            catch (GotrueException ex )
            {
                dynamic deserializedObject = JsonConvert.DeserializeObject(ex.Message);
                return BadRequest(new ProblemDetails() { Title = deserializedObject.error, Detail = deserializedObject.error_description });
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
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch(SignInFailedException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (GotrueException ex)
            {
                dynamic deserializedObject = JsonConvert.DeserializeObject(ex.Message);
                return BadRequest(new ProblemDetails() { Title = deserializedObject.error, Detail = deserializedObject.error_description });
            }
        }

        [HttpPatch("changeEmail")]
        [Authorize]
        public async Task<ActionResult> ChangeUsersEmail(string newEmailAddress)
        {
            try
            {             
                var result = await _userService.ChangeEmailAsync(newEmailAddress);
                if (!result)
                {
                    return StatusCode(500);
                }
                return Ok();
            }
            catch (ArgumentException)
            {
                return BadRequest(new ProblemDetails() { Detail = "Invalid email address."});
            }
            catch (GotrueException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message});
            }
        }

        [HttpPatch("changePassword")]
        [Authorize]
        public async Task<ActionResult> ChangeUserPassword(ChangeUserPasswordDTO request)
        {
            var message = await _userService.ChangePasswordAsync(request);
            if (string.IsNullOrEmpty(message))
            {
                return Ok();
            }
            else
            {
                return BadRequest(new ProblemDetails() { Detail = message});
            }

          
        }

        [HttpPost("signOut")]
        public async Task<ActionResult> SignOutUser()
        {
            var result = await _userService.SignOutAsync();
            if (result)
            {
                return Ok();
            }
            return BadRequest(new ProblemDetails() { Detail = "The user is not logged-in." });
        }
    }
}
