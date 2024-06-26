﻿using API.Exceptions;
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

            int roleId = 0;
            if (user.UserMetadata.TryGetValue("role_id", out var roleIdObj))
            {
                roleId = (int)(long)roleIdObj;
            }

            if (roleId == 0)
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



            int totalPoints = 0;
            if (user.UserMetadata.TryGetValue("points", out var totalPointsObj))
            {
                totalPoints = (int)(long)totalPointsObj;
            }



            return new GetUserInformationDTO()
            {
                Id = user.Id ?? "",
                Token = session.AccessToken ?? "",
                Name = name,
                Surname = surname,
                ProfilePictureUrl = profilePictureUrl,
                RoleId = roleId,
                Points = totalPoints,
                Email = user.Email ?? "",
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

            int roleId = 0;
            if (user.UserMetadata.TryGetValue("role_id", out var roleIdObj))
            {
                roleId = (int)(long)roleIdObj;
            }

            if (roleId == 0)
            {
                return null;
            }

            int totalPoints = 0;
            if (user.UserMetadata.TryGetValue("points", out var totalPointsObj))
            {
                totalPoints = (int)(long)totalPointsObj;
            }


            return new GetChildInformationDTO()
            {
                Id = user.Id ?? "",
                Token = session.AccessToken ?? "",
                Username= username,
                RoleId = roleId,
                Points = totalPoints
            };
        }

    }
}
