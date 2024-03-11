namespace API.Exceptions
{
    public class SignInFailedException : Exception
    {
        public SignInFailedException()
        {
        }

        public SignInFailedException(string message) : base(message)
        {
        }

        public SignInFailedException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
