﻿using Postgrest.Attributes;
using Postgrest.Models;

namespace API.Models
{
    [Table("teachers")]
    public class Teacher : BaseModel
    {
        [PrimaryKey("id")]
        public string Id { get; set; } = null!;
        [Column("name")]
        public string Name { get; set; } = null!;
        [Column("surname")]
        public string Surname { get; set; } = null!;
        [Column("phone_number")]
        public string PhoneNumber { get; set; } = null!;
        [Column("birth_date")]
        public DateTime BirthDate { get; set; }
        [Column("school")]
        public string School { get; set; } = null!;
        [Column("profession")]
        public string Profession { get; set; } = null!;
        [Column("email")]
        public  string Email { get; set; } = null!;
        [Column("profile_picture_url")]
        public string ProfilePictureUrl { get; set; } = null!;
        [Column("points")]
        public int Points { get; set; }
        [Column("role_id")]
        public int RoleId { get; set; } = 3;
        
    }
}
