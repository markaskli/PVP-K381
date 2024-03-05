using API.Models.DTOs.User;
using Supabase.Gotrue;

namespace API.Services.UserService
{
    public interface IUserService
    {
        Task<Session?> SignIn(UserSignInDTO request);
    }
}