using API.Models;
using API.Models.DTOs.Task;
using API.Services.TaskService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Postgrest.Exceptions;
using Supabase.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var task = await _taskService.GetTaskByIdAsync(id);
                return Ok(task);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ProblemDetails() { Detail = ex.Message });
            }
        }

        [HttpGet("childId")]
        public async Task<ActionResult> GetByChildId(string childId)
        {
            try
            {
                var task = await _taskService.GetTasksOfChildAsync(childId);
                return Ok(task);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ProblemDetails() { Detail = ex.Message });
            }         
        }

        [HttpGet("userId")]
        public async Task<ActionResult> GetByCreatorId(string userId)
        {
            try
            {
                var task = await _taskService.GetTasksByCreatorAsync(userId);
                return Ok(task);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ProblemDetails() { Detail = ex.Message });
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateForChild(CreateTaskForChildDTO request)
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            try
            {
                var task = await _taskService.CreateTaskForChildAsync(request, userToken);
                if (task == null)
                {
                    return StatusCode(500, "An error occurred while creating a task entry.");
                }
                return CreatedAtRoute("Get", routeValues: new { id = task.Id }, value: task);
            }
            catch (FormatException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }   

        }

        [HttpPost("room")]
        [Authorize]
        public async Task<ActionResult> CreateForRoom(CreateTaskForRoomDTO request)
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            try
            {
                var task = await _taskService.CreateTaskForRoomAsync(request, userToken);
                if (task == null)
                {
                    return StatusCode(500, "An error occurred while creating a task entry.");
                }
                return CreatedAtRoute("Get", routeValues: new { id = task.Id }, value: task);
            }
            catch (FormatException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }

        }

        [HttpDelete("id")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var result = await _taskService.DeleteTaskAsync(id);
                if (result)
                {
                    return Ok();
                }
                return NotFound();

            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (PostgrestException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch]
        public async Task<ActionResult> Update(UpdateTaskDTO request)
        {
            try
            {
                var task = await _taskService.UpdateTaskAsync(request);
                if (task == null)
                {
                    return StatusCode(500, "An error occurred while trying to update the entry.");
                }
                return Ok(task);
            }
            catch (FormatException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }

        }

        [HttpPatch("child")]
        public async Task<ActionResult> SetTaskCompletedChild(int taskId)
        {
            try
            {
                var result = await _taskService.UpdateTaskStatusChild(taskId);
                if (result != null)
                {
                    return Ok(result);
                }

                return BadRequest(new ProblemDetails() { Detail = "Invalid arguments were provided."});
            }
            catch (PostgrestException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
        }


        [HttpPatch("creator")]
        public async Task<ActionResult> SetTaskCompletedCreator(int taskId)
        {
            try
            {
                var result = await _taskService.UpdateTaskStatusCreator(taskId);
                if (result != null)
                {
                    return Ok(result);
                }

                return BadRequest(new ProblemDetails() { Detail = "Invalid arguments were provided." });

            }
            catch (PostgrestException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
        }
    }
}
