using API.Models;
using API.Models.DTOs.Task;

namespace API.Extensions
{
    public static class TaskExtensions
    {
        public static GetTaskDTO MapTaskToDTO(this Models.Task task)
        {
            return new GetTaskDTO()
            {
                Id = task.Id,
                CreatedAt = task.CreatedAt.ToString("yyyy/mm/dd"),
                Name = task.Name,
                Description = task.Description,
                Points = task.Points,
                IsConfirmedByChild = task.IsConfirmedByChild,
                IsConfirmedByParent = task.IsConfirmedByUser,
                DueDate = task.DueDate.ToString("yyyy/mm/dd"),
                AssignedToId = task.AssignedToId,
                CreatedById = task.CreatedById
            };
        }
    }
}
