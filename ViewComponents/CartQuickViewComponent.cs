using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using WebsiteTMDT.Data;
using WebsiteTMDT.ViewModels;

namespace WebsiteTMDT.ViewComponents
{
    public class CartQuickViewComponent : ViewComponent
    {
        private readonly WebsiteContext db;

        public CartQuickViewComponent(WebsiteContext context)
        {
            db = context;
        }

        public IViewComponentResult Invoke()
        {
            var userId = GetUserId();
            var cartItems = db.Carts
                              .Where(c => c.UserId == userId)
                              .Select(c => new CartItem
                              {
                                  MaSP = c.Product.ProductId,
                                  TenSP = c.Product.ProductName,
                                  Gia = (double)c.Product.Price,
                                  HinhAnh = c.Product.ImageUrl,
                                  SoLuong = c.Quantity
                              }).ToList();

            return View(cartItems);
        }

        private int GetUserId()
        {
            var claimsIdentity = User as ClaimsPrincipal;
            var userIdClaim = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier);

            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0; 
        }
    }
}
