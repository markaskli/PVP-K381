using API.Models.DTOs.Product;
using API.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetProductDTO>>> GetProducts()
        {
            var products = await _productService.GetProducts();
            if (products == null)
            {
                return NotFound();
            }
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductDTO>> GetById(int id)
        {
            try
            {
                var product = await _productService.GetProductById(id);
                if (product != null)
                {
                    return Ok(product);
                }

                return NotFound(new ProblemDetails() { Detail = "Product with specified ID does not exist." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ProblemDetails() { Detail = ex.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult<GetProductDTO>> Create([FromForm]CreateProductDTO request)
        {
            try
            {
                var product = await _productService.AddProduct(request);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ProblemDetails() { Detail = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _productService.DeleteProductById(id);
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }
        }
    }
}
