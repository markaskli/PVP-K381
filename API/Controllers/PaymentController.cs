using API.Models.DTOs.Payments;
using API.Services.PaymentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PaymentDTO>> CreatePaymentIntent(CreateOrUpdatePaymentIntent request)
        {
            string userToken = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            var dto = await _paymentService.CreatePaymentIntent(userToken, request.PaymentIntent, request.Points);
            return Ok(dto);

        }

        [HttpPost("webhook")]
        public async Task<ActionResult> Post()
        {
            try
            {
                var result = await _paymentService.Webhook();
                if (result == false)
                {
                    return BadRequest();
                }

                return Ok();


            }
            catch (StripeException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("test")]
        public async Task<ActionResult> test()
        {
            await _paymentService.test();
            return Ok();
        }
    }
}
