using API.Exceptions;
using API.Models;
using API.Models.DTOs.ErrorHandling;
using API.Models.DTOs.User;
using API.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Postgrest.Exceptions;
using Supabase.Gotrue;
using Supabase.Gotrue.Exceptions;
using System.Net.Mail;

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

        public async Task<bool> ChangeEmailAsync(string requestEmailAddress)
        {
                   
            var flag = RegexUtilities.IsValidEmail(requestEmailAddress);
            if (!flag)
            {
                throw new ArgumentException("Bad email address.");
            }
        
            var attrs = new UserAttributes { Email = requestEmailAddress };
            var response = await _supabaseClient.Auth.Update(attrs);
            if (response != null)
            {
                return true;
            }
            return false;
            
        }

        public async Task<string?> ChangePasswordAsync(ChangeUserPasswordDTO request)
        {
            try
            {
                var response = await _supabaseClient.Rpc("change_user_password", new Dictionary<string, object> { { "old_password", request.CurrentPassword }, { "new_password", request.NewPassword } });
                if (response != null && response.ResponseMessage.IsSuccessStatusCode)
                {
                    return "";
                }

                return null;
            }
            catch (PostgrestException ex)
            {
                ErrorDetails details = JsonConvert.DeserializeObject<ErrorDetails>(ex.Message);
                string message = details?.Message ?? "";
                return message;
            }

        }

        public async Task<bool> SignOutAsync()
        {
            var user = _supabaseClient.Auth.CurrentUser;
            if (user == null)
            {
                return false;
            }

            await _supabaseClient.Auth.SignOut();
            return true;
            
        }
    }
}
