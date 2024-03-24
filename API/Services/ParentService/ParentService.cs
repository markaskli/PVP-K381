using API.Exceptions;
using API.Models;
using API.Models.DTOs.Child;
using API.Models.DTOs.Parent;
using API.Utils;
using Newtonsoft.Json.Linq;
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

        public async Task<Session> SignUp(CreateParentDTO request)
        {

            var userData = new Dictionary<string, object>
            {
                { "name", request.Name },
                { "surname", request.Surname },
                { "phone_number", request.PhoneNumber},
                { "birth_date", request.BirthDate },
                { "profile_picture_url", string.Empty },
                { "role_id", 1 },
            };

            var signUpOptions = new SignUpOptions
            {
                Data = userData
            };


            var session = await _supabaseClient.Auth.SignUp(request.Email, request.Password, signUpOptions);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign up parent user.");
            }

            return session;
        }


        // TO DO
        public async Task<User> UpdateParentInformation(UpdateParentDTO request)
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

        public async Task<ChildRegistrationDataDTO?> RegisterChild(CreateInitialChildDTO request, string requestToken)
        {
            string invitationCode = string.Empty;

            var formattedName = request.Name.Trim();
            var formattedClass = request.Class.Trim();

            if (formattedClass.Length == 0 || formattedName.Length == 0)
            {
                throw new ArgumentException("Provided information is not of valid format.");
            }

            var existingCodes = await _supabaseClient.From<Child>()
                .Select(x => new object[] { x.InvitationCode })
                .Get();

            if (existingCodes != null && existingCodes.Content != null)
            {
                var existingInvitationCodes = JArray.Parse(existingCodes.Content);
                invitationCode = RandomGenerator.GenerateRandomString(Utils.Constants.ChildInvitationCodeLength);
                bool codeExists = existingInvitationCodes.Any(x => x["invitation_code"]?.ToString() == invitationCode);
                while (codeExists)
                {
                    invitationCode = RandomGenerator.GenerateRandomString(Utils.Constants.ChildInvitationCodeLength);
                    codeExists = existingInvitationCodes.Any(x => x["invitation_code"]?.ToString() == invitationCode);
                }

            }
            else
            {
                invitationCode = RandomGenerator.GenerateRandomString(Utils.Constants.ChildInvitationCodeLength);
            }

            if (invitationCode.Length == 0)
            {
                return null;
            }


            var parent = await _supabaseClient.Auth.GetUser(requestToken);
            if (parent == null)
            {
                throw new ArgumentException("An error occurred while trying to get the information of current user.");
            }

            

            var childData = new Dictionary<string, object>
            {
                { "username", string.Empty },
                { "name", request.Name },
                { "class", request.Class },
                { "parent_id", parent.Id },
                { "role_id", 2 },
                { "invitation_code", invitationCode },
            };

            var signupOptions = new SignUpOptions
            { 
                Data = childData 
            };

            string randomEmail = $"foo-{RandomGenerator.GenerateRandomString(Utils.Constants.RandomEmailLength)}@bar.com";
            string randomPassword = $"{RandomGenerator.GenerateRandomString(Utils.Constants.RandomPasswordLength)}";

            var session = await _supabaseClient.Auth.SignUp(randomEmail, randomPassword, signupOptions);
            if ((session == null) || session.User != null && session.User.Identities != null && session.User.Identities.Count == 0)
            {
                throw new SignInFailedException("An error occurred while trying to sign up child user.");
            }
         
            var result = new ChildRegistrationDataDTO()
            {
                InvitationCode = invitationCode,
                TempPassword = randomPassword
            };

            return result;

            

        }
    }
}
