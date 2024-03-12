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
                return NotFound(ex.Message);
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
                return NotFound(ex.Message);
            }         
        }

        [HttpGet("userId")]
        public async Task<ActionResult> GetByParentId(string userId)
        {
            try
            {
                var task = await _taskService.GetTasksByParentAsync(userId);
                return Ok(task);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Create(CreateTaskDTO request)
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            try
            {
                var task = await _taskService.CreateTaskAsync(request, userToken);
                if (task == null)
                {
                    return StatusCode(500, "An error occurred while creating a task entry.");
                }
                return CreatedAtRoute("Get", routeValues: new { id = task.Id }, value: task);
            }
            catch (FormatException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
