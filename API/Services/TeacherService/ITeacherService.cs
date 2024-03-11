using API.Models.DTOs.Teacher;
using Supabase.Gotrue;

namespace API.Services.TeacherService
{
    public interface ITeacherService
    {
        Task<Session> SignUp(CreateTeacherDTO request);
    }
}