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

        public async Task<List<GetTaskStatusDTO>> GetTaskByIdAsync(int id)
        {
            var tasks = await _supabaseClient.From<AssignedTask>()
                .Where(x => x.TaskId == id)
                .Get();

            if (tasks.Models.Count <= 0)
            {
                throw new KeyNotFoundException("No task was found");
            }

            return tasks.Models.Select(task => task.MapTaskToDTO()).ToList();

        }

        public async Task<List<GetTasksAssignedToChildDTO>> GetTasksOfChildAsync(string childId)
        {
            var childParams = new Dictionary<string, object>()
            {
                { "childid", childId },
            };

            var result = await _supabaseClient.Rpc("get_assigned_tasks_for_child", childParams);
            if (result.Content == null)
            {
                throw new KeyNotFoundException($"No tasks were found for child with Id {childId}.");
            }

            List<GetTasksAssignedToChildDTO> tasks = JsonConvert.DeserializeObject<List<GetTasksAssignedToChildDTO>>(result.Content);
            return tasks;
        }

        public async Task<List<GetTasksCreatedByUserDTO>> GetTasksByCreatorAsync(string userId)
        {
            var userParams = new Dictionary<string, object>()
            {
                { "userid", userId },
            };

            var result = await _supabaseClient.Rpc("get_assigned_tasks", userParams);
            if (result.Content == null)
            {
                throw new KeyNotFoundException($"No tasks were submitted by parent with Id {userId}.");
            }

            List<GetTasksCreatedByUserDTO> tasks = JsonConvert.DeserializeObject<List<GetTasksCreatedByUserDTO>>(result.Content);
            return tasks;
        }

        public async Task<GetTaskStatusDTO?> CreateTaskForChildAsync(CreateTaskForChildDTO request, string creatorToken)
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
                Points = request.Points,
                DueDate = request.DueDate
            };

            var task = await _supabaseClient.From<Task>().Insert(createdTask);

            var assignedTask = new AssignedTask()
            {
                TaskId = task.Model.Id,
                ChildId = request.AssignedToId,
                AssignedById = creatorId,
                IsConfirmedByChild = false,
                IsConfirmedByUser = false,
                AssignedAt = DateTime.Now,
                CompletedAt = null,
            };

            var result = await _supabaseClient
                .From<AssignedTask>()
                .Insert(assignedTask);

            if (result.ResponseMessage.IsSuccessStatusCode)
            {
                return new GetTaskStatusDTO()
                {
                    Id = task.Model.Id,
                    CreatedAt = assignedTask.AssignedAt,
                    Name = task.Model.Name,
                    Description = task.Model.Description,
                    Points = task.Model.Points,
                    IsConfirmedByChild = assignedTask.IsConfirmedByChild,
                    IsConfirmedByParent = assignedTask.IsConfirmedByUser,
                    DueDate = createdTask.DueDate,
                    AssignedToChildId = assignedTask.ChildId,
                    CreatedById = assignedTask.AssignedById
                };
            }

            return null;

        }

        public async Task<GetTaskDTOForRoom?> CreateTaskForRoomAsync(CreateTaskForRoomDTO request, string creatorToken)
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
                Points = request.Points,
                DueDate = request.DueDate
            };

            var task = await _supabaseClient.From<Task>().Insert(createdTask);
            var assignedTask = new AssignedTask()
            {
                TaskId = task.Model.Id,
                AssignedById = creatorId,
                IsConfirmedByChild = false,
                IsConfirmedByUser = false,
                AssignedAt = DateTime.Now,
                CompletedAt = null,
                RoomId = room.Id
            };

            var resultDto = new GetTaskDTOForRoom()
            {
                Id = task.Model.Id,
                CreatedAt = assignedTask.AssignedAt,
                Name = task.Model.Name,
                Description = task.Model.Description,
                Points = task.Model.Points,
                DueDate = createdTask.DueDate,
                CreatedById = assignedTask.AssignedById
            };

            foreach (Child child in room.Children)
            {
                assignedTask.ChildId = child.Id;
                var result = await _supabaseClient
                    .From<AssignedTask>()
                    .Insert(assignedTask);

                if (!result.ResponseMessage.IsSuccessStatusCode)
                {
                    return null;
                }

                resultDto.AssignedToIds.Add(child.Id);

            }




            return resultDto;


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

            var result = await task.Update<Task>();
            if (result != null && result.ResponseMessage.IsSuccessStatusCode)
            {
                return task.MapTaskToDTO();
            }

            return null;
        }

        public async Task<GetTaskStatusDTO?> UpdateTaskStatusCreator(int taskId)
        {
            var response = await _supabaseClient.From<AssignedTask>()
                .Where(x => x.Id == taskId)
                .Set(x => x.IsConfirmedByUser, true)
                .Update();

            if (response.ResponseMessage.IsSuccessStatusCode)
            {
                return response.Model.MapTaskToDTO();
            }

            return null;


        }

        public async Task<GetTaskStatusDTO?> UpdateTaskStatusChild(int taskId)
        {
            var response = await _supabaseClient.From<AssignedTask>()
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
