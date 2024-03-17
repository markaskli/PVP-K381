namespace API.Models.DTOs.ErrorHandling
{
    public class ErrorDetails
    {
        public string Code { get; set; }
        public string Details { get; set; }
        public string Hint { get; set; }
        public string Message { get; set; }
    }
}
