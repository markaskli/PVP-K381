using API.Models.DTOs.User;
using Supabase.Gotrue;

namespace API.Extensions
{
    public static class SessionExtensions
    {
        public static GetUserInformationDTO? MapSessionToUserDTO(this Session session)
        {
            var user = session.User;
            if (user == null)
            {
                return null;
            }

            var name = "";
            if (user.UserMetadata.TryGetValue("name", out var nameObj))
            {
                name = nameObj.ToString();
            }


            var surname = "";
            if (user.UserMetadata.TryGetValue("surname", out var surnameObj))
            {
                surname = surnameObj.ToString();
            }

            string profilePictureUrl = "";
            if (user.UserMetadata.TryGetValue("profile_picture_url", out var profilePictureObj))
            {
                profilePictureUrl = profilePictureObj.ToString();
            }
            
            return new GetUserInformationDTO()
            {
                Id = user.Id ?? "",
                Token = session.AccessToken ?? "",
                Name = name,
                Surname = surname,
                ProfilePictureUrl = profilePictureUrl,
                Email = user.Email ?? ""
            };
        }

        public static GetChildInformationDTO? MapSessionToChildDTO(this Session session)
        {
            var user = session.User;
            if (user == null)
            {
                return null;
            }

            var username = "";
            if (user.UserMetadata.TryGetValue("username", out var usernameObj))
            {
                username = usernameObj.ToString();
            }


            return new GetChildInformationDTO()
            {
                Id = user.Id ?? "",
                Token = session.AccessToken ?? "",
                Username= username
            };
        }

    }
}
