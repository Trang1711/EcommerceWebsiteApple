using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebsiteTMDT.Data;
using WebsiteTMDT.ViewModels;

namespace WebsiteTMDT.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly WebsiteContext db;

        public HomeController(WebsiteContext context)
        {
            db = context;
        }

        public IActionResult Index(int? loai)
        {
            var products = db.Products.AsQueryable();
            if (loai.HasValue)
            {
                products = products.Where(p => p.CategoryId == loai.Value);
            }

            var result = products.Select(p => new ProductsVM
            {
                MaLoai = p.CategoryId,
                MaSP = p.ProductId,
                TenSP = p.ProductName,
                HinhAnh = p.ImageUrl,
                Gia = (double)p.Price,
                MoTa = p.Description,
                TenLoai = p.Category.CategoryName
            });
            return View(result);
        }

        [Route("/404")]
        public IActionResult PageNotFound()
        {
            return View();
        }

        public IActionResult HotDeal()
        {
            var products = db.Products.Select(p => new ProductsVM
            {
                MaSP = p.ProductId, 
                MaLoai = (int)p.CategoryId,
                TenSP = p.ProductName,
                Gia = (double)p.Price,
                HinhAnh = p.ImageUrl,
                TenLoai = p.Category.CategoryName
            }).ToList();

            return View(products);
        }

        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult DashBoard()
        {
            return View();
        }
    }
}
