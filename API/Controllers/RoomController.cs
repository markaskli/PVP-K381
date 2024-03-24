using API.Models.DTOs.Room;
using API.Services.RoomService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Postgrest.Exceptions;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            try
            {
                var result = await _roomService.GetRoomById(id);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create()
        {
            try
            {
                string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var createdRoom = await _roomService.CreateRoomAsync(userToken);
                if (createdRoom == null)
                {
                    return StatusCode(500, "An error occurred while trying to create a room.");
                }
                return Ok(createdRoom);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch(PostgrestException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (IndexOutOfRangeException)
            {
                return BadRequest(new ProblemDetails() { Detail = "Authorization token was not provided." });
            }


        }

        [HttpPost("join")]
        public async Task<ActionResult> Join(string invitationCode)
        {
            try
            {
                string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var result = await _roomService.JoinRoomAsync(userToken, invitationCode);
                if (result)
                {
                    return Ok();
                }

                return BadRequest();

            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (PostgrestException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("creator")]
        public async Task<ActionResult> GetOfCreator()
        {
            try
            {
                string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var result = await _roomService.GetRoomsByCreatorIdAsync(userToken);
                if (result.IsNullOrEmpty())
                {
                    return BadRequest(new ProblemDetails() { Detail = "No rooms created by the user were found." });
                }
                return Ok(result);
            }
            catch (IndexOutOfRangeException)
            {
                return BadRequest(new ProblemDetails() { Detail = "Authorization token was not provided." });
            }


        }

        [HttpGet("child")]
        public async Task<ActionResult> GetOfChild()
        {
            try
            {
                string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var result = await _roomService.GetRoomsByChildIdAsync(userToken);
                if (result.IsNullOrEmpty())
                {
                    return BadRequest(new ProblemDetails() { Detail = "No rooms were found with the user." });
                }
                return Ok(result);
            }
            catch (IndexOutOfRangeException)
            {
                return BadRequest(new ProblemDetails() { Detail = "Authorization token was not provided." });
            }


        }

        [HttpDelete("id")]
        public async Task<ActionResult> DeleteById(string id)
        {
            var result = await _roomService.DeleteRoomByIdAsync(id);
            if (result)
            {
                return StatusCode(204);
            }

            return BadRequest(new ProblemDetails() { Detail = "Room with specified id does not exist." });
        }

        [HttpDelete("removeChild")]
        public async Task<ActionResult> RemoveChild(RemoveChildFromRoomDTO request)
        {
            var result = await _roomService.RemoveChildFromRoomAsync(request);
            if (result)
            {
                return StatusCode(204);
            }

            return BadRequest(new ProblemDetails() { Detail = "Bad ids provided." });
        }
    }
}
