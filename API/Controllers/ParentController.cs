using API.Extensions;
using API.Models;
using API.Models.DTOs.Parent;
using API.Services.ParentService;
using Microsoft.AspNetCore.Mvc;
using Supabase;
using Supabase.Gotrue;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentController : ControllerBase
    {
        private readonly IParentService _parentService;

        public ParentController(IParentService parentService)
        {
            _parentService = parentService;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(CreateParentDTO request)
        {
           var result = await _parentService.SignUp(request);
           if (result == null)
           {
                return BadRequest("An error occurred while trying to sign up.");
           }
            
           return Ok(result.User.MapUserToDTO());
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateParentUser(UpdateParentDTO request)
        {
            var result = await _parentService.UpdateParentInformation(request);
            if (result == null)
            {
                return BadRequest("An error occurred while trying to update the user.");
            }

            return Ok(result.MapUserToDTO());
        }
    }

    
}
