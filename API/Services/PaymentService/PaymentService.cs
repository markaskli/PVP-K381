using API.Models;
using API.Models.DTOs.Payments;
using API.Utils;
using Stripe;
using Supabase.Storage;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Supabase.Client _supabaseClient;

        public PaymentService(IConfiguration configuration, Supabase.Client supabaseClient, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _supabaseClient = supabaseClient;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<PaymentDTO> CreatePaymentIntent(string userToken, string? paymentIntent, int pointsAmount)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtTokenObject = tokenHandler.ReadJwtToken(userToken);
            var userId = jwtTokenObject.Subject;

            StripeConfiguration.ApiKey = _configuration["Stripe:Skey"];
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subtotal = pointsAmount * Constants.PointCostInCents;

            if (string.IsNullOrEmpty(paymentIntent))
            {
                var options = new PaymentIntentCreateOptions()
                {
                    Amount = subtotal,
                    Currency = "eur",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = service.Create(options);
                var payment = new Payment()
                {
                    UserId = userId,
                    PaymentIntent = intent.Id,
                    Points = pointsAmount
                   
                };

                await _supabaseClient.From<Payment>()
                    .Insert(payment);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions()
                {
                    Amount = subtotal
                };

                intent = service.Update(paymentIntent, options);
                await _supabaseClient.From<Payment>()
                    .Where(x => x.PaymentIntent == paymentIntent)
                    .Set(x => x.Points, pointsAmount)
                    .Update();
            }

            return new PaymentDTO()
            {
                PaymentIntent = intent.Id,
                ClientSecret = intent.ClientSecret
            };

        }

        public async Task<bool?> Webhook()
        {
            var json = await new StreamReader(_httpContextAccessor.HttpContext.Request.Body).ReadToEndAsync();
            string endpointSecret = _configuration["Stripe:WhSecret"];

            var stripeEvent = EventUtility.ConstructEvent(json, _httpContextAccessor.HttpContext.Request.Headers["Stripe-Signature"], endpointSecret);

            var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
            var paymentModel = await _supabaseClient.From<Payment>()
                .Where(x => x.PaymentIntent == paymentIntent.Id)
                .Get();

            if (paymentModel.Model == null)
            {
                return false;
            }


            if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            {

                var paymentSucceededProps = new Dictionary<string, object>()
                {
                    {"gainedpoints", paymentModel.Model.Points },
                    {"userid", paymentModel.Model.UserId }
                };
                var result = await _supabaseClient.Rpc("payment_succeeded", paymentSucceededProps);
                return true;
            }

            return false;

        }
    }
}
