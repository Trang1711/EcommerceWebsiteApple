using System;
using System.Collections.Generic;

namespace WebsiteTMDT.Data;

public partial class Cart
{
    public int ProductId { get; set; }

    public int UserId { get; set; }

    public int Quantity { get; set; }

    public int CartId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
