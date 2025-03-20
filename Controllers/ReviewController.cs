using Microsoft.AspNetCore.Mvc;
using WebsiteTMDT.Data;
using WebsiteTMDT.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteTMDT.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly WebsiteContext _context;

        public ReviewsController(WebsiteContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostReview([FromBody] ReviewModel model)
        {
            if (model == null || model.danhGia < 1 || model.danhGia > 5)
                return BadRequest("Invalid data.");

            var user = _context.Users.FirstOrDefault(u => u.Email == model.email);
            int userId = user?.UserId ?? 0;

            var review = new Review
            {
                UserId = userId,
                ProductId = model.maSanPham,
                ReviewText = model.noiDung,
                Rating = model.danhGia,
                CreatedAt = DateTime.Now
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Review added successfully!" });
        }
    }

    public class ReviewModel
    {
        public string tenKhachHang { get; set; }
        public string email { get; set; }
        public string noiDung { get; set; }
        public int danhGia { get; set; }
        public int maSanPham { get; set; }
    }
}
