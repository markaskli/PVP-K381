using API.Models.DTOs.Child;
using Supabase.Gotrue;

namespace API.Services.ChildService
{
    public interface IChildService
    {
        Task<Session> Register(ChildRegistrationDTO request);
    }
}