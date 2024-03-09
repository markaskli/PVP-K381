using System.Text;

namespace API.Utils
{
    public static class RandomGenerator
    {
        private static Random _random = new Random();

        public static string GenerateRandomString(int length)
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder builder = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                builder.Append(chars[_random.Next(chars.Length)]);
            }

            return builder.ToString();
        }
    }
}
