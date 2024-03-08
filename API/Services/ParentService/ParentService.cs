using API.Models;
using API.Models.DTOs.Parent;
using Supabase.Gotrue;

namespace API.Services.ParentService
{
    public class ParentService : IParentService
    {
        private readonly Supabase.Client _supabaseClient;
        public ParentService(Supabase.Client supabase)
        {
            _supabaseClient = supabase;
        }

        public async Task<Session?> SignUp(CreateParentDTO request)
        {
            var parent = new Parent()
            {
                Name = request.Name,
                Surname= request.Surname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                BirthDate = request.BirthDate,
                
            };

            var userData = new Dictionary<string, object>
            {
                { "name", request.Name },
                { "surname", request.Surname },
                { "phone_number", request.PhoneNumber},
                { "birth_date", request.BirthDate },
                { "profile_picture_url", request.ProfilePictureUrl },
                { "role_id", parent.RoleId },
            };

            var signUpOptions = new SignUpOptions
            {
                Data = userData
            };


            var session = await _supabaseClient.Auth.SignUp(request.Email, request.Password, signUpOptions);

            return session;
        }

        public async Task<User?> UpdateParentInformation(UpdateParentDTO request)
        {
            var attrs = new UserAttributes
            {
                Data = new Dictionary<string, object>
                {
                    { "", "" }
                }
            };

            var response = await _supabaseClient.Auth.Update(attrs);
            if (response != null)
            {
                return null;
            }
            return response;

        }

        public async Task<bool> DeleteParent(int parentId)
        {
            return true;
        }
    }
}
