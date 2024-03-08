using API.Extensions;
using API.Models;
using API.Models.DTOs.Parent;
using API.Services.ParentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Supabase;
using Supabase.Gotrue;
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
           var session = await _parentService.SignUp(request);
           if (session == null)
           {
                return BadRequest("An error occurred while trying to sign up.");
           }

            var result = session.MapSessionToUserDTO();
            if (result == null)
            {
                return BadRequest("An error occurred while trying to parse the information.");
            }
            
           return Ok(result);
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateParentUser(UpdateParentDTO request)
        {
            var user = await _parentService.UpdateParentInformation(request);
            if (user == null)
            {
                return BadRequest("An error occurred while trying to update the user.");
            }

            

            return Ok(user);
        }

        [HttpGet]
        [Authorize(Policy = "RequireParentRole")]
        public ActionResult Get()
        {
            //_logger.LogInformation("Authorization policy evaluation started.");
            //// Access user_metadata from the ClaimsPrincipal (User)
            //var userMetadataClaim = User.FindFirst("user_metadata");
            //if (userMetadataClaim != null)
            //{
            //    // Deserialize user_metadata JSON string to an object
            //    var userMetadata = JsonSerializer.Deserialize<UserMetadata>(userMetadataClaim.Value);

            //    // Access role_id from the user_metadata object
            //    var roleId = userMetadata?.role_id;

            //    if (roleId != null)
            //    {
            //        _logger.LogInformation("Role ID claim: {roleId}", roleId);
            //    }
            //    else
            //    {
            //        _logger.LogInformation("Role ID claim is missing or null.");
            //    }
            //}
            //else
            //{
            //    _logger.LogInformation("User metadata claim is missing.");
            //}
            return Ok();

        }
    }

    
}
