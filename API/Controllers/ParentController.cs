using API.Exceptions;
using API.Extensions;
using API.Models;
using API.Models.DTOs.Child;
using API.Models.DTOs.Parent;
using API.Services.ParentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Supabase;
using Supabase.Gotrue;
using Supabase.Gotrue.Exceptions;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentController : ControllerBase
    {
        private readonly IParentService _parentService;
        private readonly ILogger<ParentController> _logger;

        public ParentController(IParentService parentService, ILogger<ParentController> logger)
        {
            _parentService = parentService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(CreateParentDTO request)
        {
            try
            {
                var session = await _parentService.SignUp(request);
                var result = session.MapSessionToUserDTO();
                if (result == null)
                {
                    return StatusCode(500, "An error occurred while trying to parse the information.");
                }
                return Ok(result);
            }
            catch(SignInFailedException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (GotrueException)
            {
                return BadRequest();
            }

        }

        [HttpPost("addChild")]
        [Authorize]
        public async Task<ActionResult> RegisterChild(CreateInitialChildDTO request)
        {
            try
            {
                string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var result = await _parentService.RegisterChild(request, userToken);
                if (result == null)
                {
                    return BadRequest("An error occurred while trying to generate invitation code.");
                }
                return Ok(result);
            }
            catch (SignInFailedException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (GotrueException)
            {
                return BadRequest();
            }
            catch (IndexOutOfRangeException)
            {
                return BadRequest(new ProblemDetails() { Detail = "Authorization token was not provided." });
            }


        }

        [HttpGet]
        [Authorize(Policy = "RequireParentRole")]
        public ActionResult Get()
        {
            return Ok();

        }
    }

    
}
