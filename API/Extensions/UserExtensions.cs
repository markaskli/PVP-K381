using API.Models.DTOs.User;
using Supabase.Gotrue;

namespace API.Extensions
{
    public static class UserExtensions
    {
        public static GetUserInformationDTO MapUserToDTO(this User user)
        {
            var fullName = "";
            if (user.UserMetadata.TryGetValue("full_name", out var fullNameObj))
            {
                fullName = fullNameObj.ToString() ?? "";
            }

            string profilePictureUrl = "";
            if (user.UserMetadata.TryGetValue("profile_picture_url", out var profilePictureObj))
            {
                profilePictureUrl = profilePictureObj.ToString() ?? "";
            }



            return new GetUserInformationDTO()
            {
                Id = user.Id ?? "",
                FullName = fullName,
                ProfilePictureUrl = profilePictureUrl,
                Email = user.Email ?? ""
            };
        }
    }
}
