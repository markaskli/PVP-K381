using API.Models.DTOs.Task;

namespace API.Services.TaskService
{
    public interface ITaskService
    {
        Task<GetTaskDTO?> CreateTaskAsync(CreateTaskDTO request, string creatorUserId);
        Task<bool> DeleteTaskAsync(int taskId);
        Task<GetTaskDTO> GetTaskByIdAsync(int id);
        Task<List<GetTaskDTO>> GetTasksByParentAsync(string parentId);
        Task<List<GetTaskDTO>> GetTasksOfChildAsync(string childId);
        Task<GetTaskDTO?> UpdateTaskAsync(UpdateTaskDTO request);
    }
}