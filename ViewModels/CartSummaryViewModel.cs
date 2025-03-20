using WebsiteTMDT.Data;
using WebsiteTMDT.ViewModels;

namespace WebsiteTMDT.ViewModels
{

    namespace WebsiteTMDT.ViewModels
    {
        public class CartSummaryViewModel
        {
            public int TotalQuantity { get; set; }
            public double TotalPrice { get; set; }
            public List<CartItem> Items { get; set; }
        }
    }
}
