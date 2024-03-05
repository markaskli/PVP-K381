using API.Models.DTOs.User;
using Supabase.Gotrue;

namespace API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly Supabase.Client _supabaseClient;

        public UserService(Supabase.Client supabase)
        {
            _supabaseClient = supabase;
        }

        public async Task<Session?> SignIn(UserSignInDTO request)
        {
            var session = await _supabaseClient.Auth.SignIn(request.Email, request.Password);
            return session;
        }
    }
}
