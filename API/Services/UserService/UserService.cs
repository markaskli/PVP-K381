using API.Exceptions;
using API.Models;
using API.Models.DTOs.User;
using Microsoft.AspNetCore.Identity;
using Supabase.Gotrue;
using Supabase.Gotrue.Exceptions;

namespace API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly Supabase.Client _supabaseClient;

        public UserService(Supabase.Client supabase)
        {
            _supabaseClient = supabase;
        }

        public async Task<Session> SignIn(UserSignInDTO request)
        {
            var session = await _supabaseClient.Auth.SignIn(request.Email, request.Password);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign in.");
            }
            return session;
        }

        public async Task<Session> SignInChild(ChildSignInDTO request)
        {
            var child = await _supabaseClient.From<Child>()
                .Where(x => x.Username == request.Username)
                .Single();

            if (child == null)
            {
                throw new ArgumentException("User with specified username doesn't exist.");
            }

            Session session = await _supabaseClient.Auth.SignIn(child.Email, request.Password);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign in.");
            }

            return session;
        }
    }
}
