using API.Models.DTOs.Payments;

namespace API.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<PaymentDTO> CreatePaymentIntent(string userToken, string? paymentIntent, int pointsAmount);
        Task<bool?> Webhook();
    }
}