using API.Models.DTOs.Task;

namespace API.Services.TaskService
{
    public interface ITaskService
    {
        Task<GetTaskDTOForRoom?> CreateTaskForRoomAsync(CreateTaskForRoomDTO request, string creatorToken);
        Task<GetTaskStatusDTO?> CreateTaskForChildAsync(CreateTaskForChildDTO request, string creatorUserId);
        Task<bool> DeleteTaskAsync(int taskId);
        Task<List<GetTaskStatusDTO>> GetTaskByIdAsync(int id);
        Task<List<GetTasksCreatedByUserDTO>> GetTasksByCreatorAsync(string parentId);
        Task<List<GetTasksAssignedToChildDTO>> GetTasksOfChildAsync(string childId);
        Task<GetTaskDTO?> UpdateTaskAsync(UpdateTaskDTO request);
        Task<GetTaskStatusDTO> UpdateTaskStatusCreator(int assignedTaskId, string userToken);
        Task<GetTaskStatusDTO?> UpdateTaskStatusChild(int assignedTaskId, string userToken);
    }
}