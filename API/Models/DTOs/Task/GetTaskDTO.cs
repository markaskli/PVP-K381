﻿namespace API.Models.DTOs.Task
{
    public class GetTaskDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Points { get; set; }
        public required DateTime DueDate { get; set; }
    }
}
