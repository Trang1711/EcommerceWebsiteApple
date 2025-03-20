using ClosedXML.Excel;
using iText.IO.Font.Constants;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebsiteTMDT.Data;

namespace WebsiteTMDT.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ReportController : Controller
    {
        private readonly WebsiteContext _context;

        public ReportController(WebsiteContext context)
        {
            _context = context;
        }

        // Trang báo cáo hiển thị biểu đồ
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("api/sales-report")]
        public IActionResult GetSalesReport([FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate)
        {
            var query = _context.Orders
                .Where(o => o.Status == "Completed");

            if (fromDate.HasValue)
                query = query.Where(o => o.CreatedAt >= fromDate.Value);
            if (toDate.HasValue)
                query = query.Where(o => o.CreatedAt <= toDate.Value);

            var totalRevenue = query.Sum(o => o.TotalAmount);
            var totalCustomers = query.Select(o => o.UserId).Distinct().Count();
            var totalProductsSold = _context.OrderDetails
                .Where(od => query.Select(o => o.OrderId).Contains(od.OrderId))
                .Sum(od => od.Quantity);

            var salesOverTime = query
                .GroupBy(o => new { o.CreatedAt.Value.Year, o.CreatedAt.Value.Month })
                .Select(g => new { year = g.Key.Year, month = g.Key.Month, revenue = g.Sum(o => o.TotalAmount) })
                .ToList();

            var salesByCategory = _context.OrderDetails
                .Where(od => query.Select(o => o.OrderId).Contains(od.OrderId))
                .GroupBy(od => od.Product.Category.CategoryName)
                .Select(g => new { category = g.Key, count = g.Sum(od => od.Quantity) })
                .ToDictionary(x => x.category, x => x.count);

            // Lấy thông tin chi tiết khách hàng
            var customerDetails = query
                .GroupBy(o => new { o.UserId, o.User.FullName, o.User.Email })
                .Select(g => new
                {
                    userId = g.Key.UserId,
                    name = g.Key.FullName,
                    email = g.Key.Email,
                    orderCount = g.Count(),
                    totalSpent = g.Sum(o => o.TotalAmount)
                })
                .ToList();

            // Lấy thông tin chi tiết sản phẩm bán ra
            var productDetails = _context.OrderDetails
                .Where(od => query.Select(o => o.OrderId).Contains(od.OrderId))
                .GroupBy(od => new { od.ProductId, od.Product.ProductName, od.Product.Category.CategoryName })
                .Select(g => new
                {
                    productId = g.Key.ProductId,
                    productName = g.Key.ProductName,
                    category = g.Key.CategoryName,
                    quantitySold = g.Sum(od => od.Quantity),
                    totalRevenue = g.Sum(od => od.Quantity * od.Price)
                })
                .ToList();

            return Ok(new
            {
                totalRevenue,
                totalCustomers,
                totalProductsSold,
                salesOverTime,
                salesByCategory,
                customerDetails,
                productDetails
            });
        }

        // Xuất báo cáo ra Excel
        public IActionResult ExportToExcel()
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Sales Report");

            worksheet.Cell(1, 1).Value = "Thống kê doanh thu";
            worksheet.Cell(2, 1).Value = "Tổng doanh thu:";
            worksheet.Cell(2, 2).Value = _context.Orders.Where(o => o.Status == "Completed").Sum(o => o.TotalAmount);

            worksheet.Cell(3, 1).Value = "Tổng số khách hàng:";
            worksheet.Cell(3, 2).Value = _context.Orders.Select(o => o.UserId).Distinct().Count();

            worksheet.Cell(4, 1).Value = "Tổng số sản phẩm đã bán:";
            worksheet.Cell(4, 2).Value = _context.OrderDetails.Sum(od => od.Quantity);

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "SalesReport.xlsx");
        }

        // Xuất báo cáo ra PDF
        public IActionResult ExportToPdf()
        {
            using var stream = new MemoryStream();
            using var writer = new PdfWriter(stream);
            using var pdf = new PdfDocument(writer);
            var document = new Document(pdf);

            document.Add(new Paragraph("Thống kê doanh thu").SetFont(PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD)).SetFontSize(16));
            document.Add(new Paragraph($"Tổng doanh thu: {_context.Orders.Where(o => o.Status == "Completed").Sum(o => o.TotalAmount)} VND"));
            document.Add(new Paragraph($"Tổng số khách hàng: {_context.Orders.Select(o => o.UserId).Distinct().Count()}"));
            document.Add(new Paragraph($"Tổng số sản phẩm đã bán: {_context.OrderDetails.Sum(od => od.Quantity)}"));

            document.Close();
            return File(stream.ToArray(), "application/pdf", "SalesReport.pdf");
        }
    }
}
