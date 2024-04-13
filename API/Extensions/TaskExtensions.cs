using API.Models;
using API.Models.DTOs.Task;

namespace API.Extensions
{
    public static class TaskExtensions
    {
        public static GetTaskStatusDTO MapTaskToDTO(this AssignedTask assignedTask)
        {
            return new GetTaskStatusDTO()
            {
                Id = assignedTask.Id,
                TaskId = assignedTask.Task.Id,
                CreatedAt = assignedTask.AssignedAt,
                Name = assignedTask.Task.Name,
                Description = assignedTask.Task.Description,
                Points = assignedTask.Task.Points,
                IsConfirmedByChild = assignedTask.IsConfirmedByChild,
                IsConfirmedByParent = assignedTask.IsConfirmedByUser,
                DueDate = assignedTask.Task.DueDate,
                AssignedToChildId = assignedTask.ChildId,
                CreatedById = assignedTask.AssignedById,
                CompletedAt = assignedTask.CompletedAt,
                IsFinished = assignedTask.IsFinished
            };
        }

        public static GetTaskDTO MapTaskToDTO(this Models.Task task)
        {
            return new GetTaskDTO()
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                DueDate = task.DueDate,
                Points = task.Points
            };
        }


    }
}
