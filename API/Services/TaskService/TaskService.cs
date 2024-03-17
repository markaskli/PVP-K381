using API.Extensions;
using API.Models;
using API.Models.DTOs.Task;
using Microsoft.IdentityModel.Tokens;
using Supabase;
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
            var tasks = await _supabaseClient.From<Task>()
                .Where(x => x.AssignedToId == childId)
                .Get();

            if (tasks.Models.IsNullOrEmpty())
            {
                throw new KeyNotFoundException($"No tasks were found for child with id {childId}.");
            }

            return tasks.Models.Select(task => task.MapTaskToDTO()).ToList();
        }

        public async Task<List<GetTaskDTO>> GetTasksByParentAsync(string parentId)
        {
            var tasks = await _supabaseClient.From<Task>()
                .Where(x => x.CreatedById == parentId)
                .Get();

            if (tasks.Models.IsNullOrEmpty())
            {
                throw new KeyNotFoundException($"No tasks were submitted by parent with id {parentId}.");
            }

            return tasks.Models.Select(task => task.MapTaskToDTO()).ToList();
        }

        public async Task<GetTaskDTO?> CreateTaskAsync(CreateTaskDTO request, string creatorToken)
        {
            if (request.Points <= 0)
            {
                throw new ArgumentException("Amount of points can not be lower or equal to 0.");
            }

            var creator = await _supabaseClient.Auth.GetUser(creatorToken);
            if (creator == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }

            DateTime requestDueDate;
            if (!DateTime.TryParse(request.DueDate, out requestDueDate))
            {
                throw new FormatException("The provided date was in an incorrect format.");
            }

            if (requestDueDate.Date < DateTime.Now.Date)
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
                DueDate = requestDueDate,
                CreatedById = creator.Id,
                AssignedToId = request.AssignedToId
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
                DateTime requestDueDate;
                if (!DateTime.TryParse(request.DueDate, out requestDueDate))
                {
                    throw new FormatException("The provided date was in an incorrect format.");
                }
                task.DueDate = requestDueDate;
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

            if (request.AssignedToId != null)
            {
                if (request.AssignedToId.Length > 0)
                {
                    task.AssignedToId = request.AssignedToId.Trim();
                }
                else
                {
                    throw new ArgumentException("Not valid Id value");
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
    }
}
