using API.Models.DTOs.Task;

namespace API.Services.TaskService
{
    public interface ITaskService
    {
        Task<GetTaskDTO?> CreateTaskForRoomAsync(CreateTaskDTO request, string creatorToken);
        Task<GetTaskDTO?> CreateTaskForChildAsync(CreateTaskDTO request, string creatorUserId);
        Task<bool> DeleteTaskAsync(int taskId);
        Task<GetTaskDTO> GetTaskByIdAsync(int id);
        Task<List<GetTaskDTO>> GetTasksByCreatorAsync(string parentId);
        Task<List<GetTaskDTO>> GetTasksOfChildAsync(string childId);
        Task<GetTaskDTO?> UpdateTaskAsync(UpdateTaskDTO request);
        Task<GetTaskDTO?> UpdateTaskStatusCreator(int taskId);
        Task<GetTaskDTO?> UpdateTaskStatusChild(int taskId);
    }
}