using System;
using System.Collections.Generic;

namespace WebsiteTMDT.Data;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int OrderId { get; set; }

    public DateTime? IssuedDate { get; set; }

    public decimal TotalAmount { get; set; }

    public string PaymentStatus { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
