namespace API.Models.DTOs.Payments
{
    public class PaymentDTO
    {
        public required string PaymentIntent { get; set; }
        public required string ClientSecret { get; set; }
    }
}
