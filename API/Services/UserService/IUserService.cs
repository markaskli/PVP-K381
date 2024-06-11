using API.Models.DTOs.User;
using Supabase.Gotrue;

namespace API.Services.UserService
{
    public interface IUserService
    {
        Task<string?> ChangePasswordAsync(ChangeUserPasswordDTO request);
        Task<bool> ChangeEmailAsync(string requestEmailAddress);
        Task<Session> SignIn(UserSignInDTO request);
        Task<Session> SignInChild(ChildSignInDTO request);
        Task<bool> SignOutAsync();
        Task<string?> GetPointsOfUser(string userId);
    }
}