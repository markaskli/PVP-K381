using System.IdentityModel.Tokens.Jwt;

namespace API.Utils
{
    public static class AuthUtilies
    {
        public static string GetUserId(HttpContext httpContext)
        {
            string userToken = httpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var userId = jwtTokenObject.Subject;
            return userId;
        }
    }
}
