namespace API.Models.DTOs.Teacher
{
    public class CreateTeacherDTO
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public required string School { get; set; }
        public required string Profession { get; set; }
        public required string Password { get; set; }
    }
}
