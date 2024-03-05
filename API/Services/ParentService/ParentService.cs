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
                FullName = request.FullName,
                ProfilePictureUrl = request.ProfilePictureUrl,
                Email = request.Email,
            };

            var userData = new Dictionary<string, object>
            {
                { "full_name", request.FullName },
                { "profile_picture_url", request.ProfilePictureUrl }
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
