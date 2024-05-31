using API.Models.DTOs.Inventory;
using API.Services.InventoryService;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<GetIventoryDTO>> GetInventory()
        {
            var userId = AuthUtilies.GetUserId(HttpContext);
            var inventory = await _inventoryService.GetInventoryItemsAsync(userId);
            if (inventory == null)
            {
                return NotFound(new ProblemDetails() { Detail = "Inventory of the user was not found." });
            }

            return Ok(inventory);

        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<GetIventoryDTO>> AddItem(int productId, int quantity)
        {
            var userId = AuthUtilies.GetUserId(HttpContext);
            var inventory = await _inventoryService.AddItemToInventoryAsync(productId, userId, quantity);
            if (inventory == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "Invalid product provided."});
            }

            return Ok(inventory);

        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<GetIventoryDTO>> RemoveItem(int productId, int quantity)
        {
            var userId = AuthUtilies.GetUserId(HttpContext);
            var inventory = await _inventoryService.RemoveItemFromInventoryAsync(productId, userId, quantity);
            if (inventory == null)
            {
                return BadRequest(new ProblemDetails() { Detail = "User does not have any items in the inventory or the invetory does not contain the product." });
            }

            return Ok(inventory);

        }
    }
}
