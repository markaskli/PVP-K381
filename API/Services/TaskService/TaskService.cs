using API.Extensions;
using API.Models;
using API.Models.DTOs.Task;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Supabase;
using System.IdentityModel.Tokens.Jwt;
using Task = API.Models.Task;

namespace API.Services.TaskService
{
    public class TaskService : ITaskService
    {
        private readonly Client _supabaseClient;

        public TaskService(Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<GetTaskDTO> GetTaskByIdAsync(int id)
        {
            var task = await _supabaseClient.From<Task>()
                .Where(x => x.Id == id)
                .Single();

            if (task == null)
            {
                throw new KeyNotFoundException("No task was found");
            }

            return task.MapTaskToDTO();

        }

        public async Task<List<GetTaskDTO>> GetTasksOfChildAsync(string childId)
        {
            var childParams = new Dictionary<string, object>()
            {
                { "childid", childId },
            };

            var result = await _supabaseClient.Rpc("get_tasks_for_child", childParams);
            if (result.Content == null)
            {
                throw new KeyNotFoundException($"No tasks were found for child with Id {childId}.");
            }

            List<Task> tasks = JsonConvert.DeserializeObject<List<Task>>(result.Content);
            return tasks.Select(task => task.MapTaskToDTO()).ToList();
        }

        public async Task<List<GetTaskDTO>> GetTasksByCreatorAsync(string userId)
        {
            var userParams = new Dictionary<string, object>()
            {
                { "userid", userId },
            };

            var result = await _supabaseClient.Rpc("get_tasks_for_creator", userParams);
            if (result.Content == null)
            {
                throw new KeyNotFoundException($"No tasks were submitted by parent with Id {userId}.");
            }

            List<Task> tasks = JsonConvert.DeserializeObject<List<Task>>(result.Content);


            return tasks.Select(task => task.MapTaskToDTO()).ToList();
        }

        public async Task<GetTaskDTO?> CreateTaskForChildAsync(CreateTaskForChildDTO request, string creatorToken)
        {
            if (request.AssignedToId == null)
            {
                throw new ArgumentNullException("Child Id cannot be null.");
            }

            if (request.Points <= 0)
            {
                throw new ArgumentException("Amount of points can not be lower or equal to 0.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(creatorToken);
            var creatorId = jwtTokenObject.Subject;
            if (creatorId == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }

            if (request.DueDate < DateTime.Now.Date)
            {
                throw new ArgumentException("Invalid value of due date provided.");
            }

            var createdTask = new Task()
            {
                Name = request.Name,
                Description = request.Description,
                CreatedAt = DateTime.Now,
                Points = request.Points,
                IsConfirmedByChild = false,
                IsConfirmedByUser = false,
                DueDate = request.DueDate,
                CreatedById = creatorId,
                AssignedToChildId = request.AssignedToId,
                AssignedToRoom = null
            };

            var result = await _supabaseClient.From<Task>().Insert(createdTask);
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return result.Model.MapTaskToDTO();
            }

            return null;

        }

        public async Task<GetTaskDTO?> CreateTaskForRoomAsync(CreateTaskForRoomDTO request, string creatorToken)
        {
            if (request.AssignToRoomId == null)
            {
                throw new ArgumentException("Room Id cannot be null.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(creatorToken);
            var creatorId = jwtTokenObject.Subject;
            if (creatorId == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }

            var room = await _supabaseClient.From<Room>()
                .Where(r => r.Id == request.AssignToRoomId)
                .Single();

            if (room == null)
            {
                throw new KeyNotFoundException("Room with specified Id does not exist");
            }

            if (request.Points <= 0)
            {
                throw new ArgumentException("Amount of points can not be lower or equal to 0.");
            }         

            if (request.DueDate < DateTime.Now.Date)
            {
                throw new ArgumentException("Invalid value of due date provided.");
            }

            var createdTask = new Task()
            {
                Name = request.Name,
                Description = request.Description,
                CreatedAt = DateTime.Now,
                Points = request.Points,
                IsConfirmedByChild = false,
                IsConfirmedByUser = false,
                DueDate = request.DueDate,
                CreatedById = creatorId,
                AssignedToChildId = null,
                AssignedToRoom = room.Id
            };

            var result = await _supabaseClient.From<Task>().Insert(createdTask);
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return result.Model.MapTaskToDTO();
            }

            return null;


        }

        public async Task<bool> DeleteTaskAsync(int taskId)
        {
            if (taskId <= 0)
            {
                throw new ArgumentException($"Provided task id is not valid.");
            }

            var task = await _supabaseClient.From<Task>()
                .Where(x => x.Id == taskId)
                .Single();

            if (task == null)
            {
                return false;
            }

            await task.Delete<Task>();

            return true;         
        }

        public async Task<GetTaskDTO?> UpdateTaskAsync(UpdateTaskDTO request)
        {
            if (request.Id <= 0)
            {
                throw new ArgumentException($"Id {request.Id} is not valid.");
            }

            var task = await _supabaseClient.From<Task>()
                .Where(x => x.Id == request.Id)
                .Single();

            if (task == null)
            {
                throw new KeyNotFoundException($"Task with id {request.Id} was not found.");
            }


            if (request.DueDate != null)
            {
                task.DueDate = request.DueDate.Value;
            }

            if (request.Name != null)
            {
                if (request.Name.Length > 0)
                {
                    task.Name = request.Name.Trim();
                }
                else
                {
                    throw new ArgumentException("Name format is not valid.");
                }
            }

            if (request.Description != null)
            {
                if (request.Description.Length > 0)
                {
                    task.Description = request.Description.Trim();
                }
                else
                {
                    throw new ArgumentException("Description format is not valid.");
                }
            }

            if (request.Points != null)
            {
                if (request.Points.Value > 0)
                {
                    task.Points = request.Points.Value;
                }
                else
                {
                    throw new ArgumentException("Points value is not of valid format");
                }
                
            }

            if (request.IsConfirmedByChild != null)
            {
                task.IsConfirmedByChild = request.IsConfirmedByChild.Value;
            }

            if (request.IsConfirmedByUser != null)
            {
                task.IsConfirmedByUser = request.IsConfirmedByUser.Value;
            }

            var result = await task.Update<Task>();
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return task.MapTaskToDTO();
            }

            return null;
        }

        public async Task<GetTaskDTO?> UpdateTaskStatusCreator(int taskId)
        {
            var response = await _supabaseClient.From<Task>()
                .Where(x => x.Id == taskId)
                .Set(x => x.IsConfirmedByUser, true)
                .Update();

            if (response.ResponseMessage.IsSuccessStatusCode)
            {
                return response.Model.MapTaskToDTO();
            }

            return null;


        }

        public async Task<GetTaskDTO?> UpdateTaskStatusChild(int taskId)
        {
            var response = await _supabaseClient.From<Task>()
                .Where(x => x.Id == taskId)
                .Set(x => x.IsConfirmedByChild, true)
                .Update();

            if (response.ResponseMessage.IsSuccessStatusCode)
            {
                return response.Model.MapTaskToDTO();
            }

            return null;
        }
    }
}
