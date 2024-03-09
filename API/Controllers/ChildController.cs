using API.Exceptions;
using API.Extensions;
using API.Models.DTOs.Child;
using API.Services.ChildService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChildController : ControllerBase
    {
        private readonly IChildService _childService;

        public ChildController(IChildService childService)
        {
            _childService = childService;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(ChildRegistrationDTO request)
        {
            try
            {
                var session = await _childService.Register(request);
                var result = session.MapSessionToChildDTO();
                if (result == null)
                {
                    return StatusCode(500, "An error occurred while trying to parse the information.");
                }
                return Ok(result);

            }
            catch (SignInFailedException ex)
            {
                return BadRequest(ex.Message);
            }          

        }
    }
}
