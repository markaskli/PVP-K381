using API.Models.DTOs.Parent;
using API.Models;
using Supabase.Gotrue;
using API.Models.DTOs.Teacher;
using API.Exceptions;

namespace API.Services.TeacherService
{
    public class TeacherService : ITeacherService
    {
        private readonly Supabase.Client _supabaseClient;
        public TeacherService(Supabase.Client supabase)
        {
            _supabaseClient = supabase;
        }

        public async Task<Session> SignUp(CreateTeacherDTO request)
        {

            var userData = new Dictionary<string, object>
            {
                { "name", request.Name },
                { "surname", request.Surname },
                { "phone_number", request.PhoneNumber},
                { "birth_date", request.BirthDate },
                { "school", request.School },
                { "profile_picture_url", string.Empty },
                { "profession", request.Profession },
                { "role_id", 3 },
            };

            var signUpOptions = new SignUpOptions
            {
                Data = userData
            };


            var session = await _supabaseClient.Auth.SignUp(request.Email, request.Password, signUpOptions);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign up teacher user.");
            }

            return session;
        }
    }
}
