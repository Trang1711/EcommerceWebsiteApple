using System;
using System.Collections.Generic;

namespace WebsiteTMDT.Data;

public partial class ShippingAddress
{
    public int AddressId { get; set; }

    public int UserId { get; set; }

    public string Address { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
