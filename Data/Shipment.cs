using System;
using System.Collections.Generic;

namespace WebsiteTMDT.Data;

public partial class Shipment
{
    public int ShipmentId { get; set; }

    public int OrderId { get; set; }

    public int ProviderId { get; set; }

    public string TrackingNumber { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly? EstimatedDelivery { get; set; }

    public DateOnly? ActualDelivery { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ShippingProvider Provider { get; set; } = null!;
}
