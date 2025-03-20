using Microsoft.AspNetCore.Mvc;
using WebsiteTMDT.Data;
using WebsiteTMDT.ViewModels;

namespace WebsiteTMDT.ViewComponents
{
    public class CategoriesViewComponent : ViewComponent 
    {
        private readonly WebsiteContext db;

        public CategoriesViewComponent(WebsiteContext context) => db = context;

        public IViewComponentResult Invoke()
        {
            var data = db.Categories.Select(lo => new CategoriesVM
            {
                MaLoai = (int)lo.CategoryId,
                TenLoai = lo.CategoryName,
                SoLuong = lo.Products.Count
            }).OrderBy(p => p.TenLoai);
            return View(data); //Default.cshtml
        }
    }
}
