﻿namespace API.Models.DTOs.Product
{
    public class GetProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
        public int HealthChange { get; set; }
    }
}
