using API.Exceptions;
using API.Models;
using API.Models.DTOs.Child;
using Supabase.Gotrue;
using Supabase.Gotrue.Exceptions;

namespace API.Services.ChildService
{
    public class ChildService : IChildService
    {
        private readonly Supabase.Client _supabaseClient;
        public ChildService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<Session> Register(ChildRegistrationDTO request)
        {
            if (request.RegistrationCode == null || request.RegistrationCode.Length == 0)
            {
                throw new ArgumentException("Specified registration key is invalid.");
            }

            var initialChild = await _supabaseClient.From<Child>()
                .Where(x => x.InvitationCode == request.RegistrationCode)
                .Single();

            if (initialChild == null)
            {
                throw new ArgumentException("Child with specified registration code does not exist.");
            }

            initialChild.Username = request.Username;
            var res = await initialChild.Update<Child>();


            var session = await _supabaseClient.Auth.SignIn(initialChild.Email, request.CurrentPassword);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign in child user.");
            }

            var childData = new Dictionary<string, object>
            {
                { "username", request.Username },
            };

            var attrs = new UserAttributes 
            {
                Data = childData,
                Password = request.NewPassword 
            };
            var response = await _supabaseClient.Auth.Update(attrs);

            return session;


        }
    }
}
