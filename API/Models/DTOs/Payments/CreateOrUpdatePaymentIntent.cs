namespace API.Models.DTOs.Payments
{
    public class CreateOrUpdatePaymentIntent
    {
        public int Points { get; set; }
        public string? PaymentIntent { get; set; }
    }
}
