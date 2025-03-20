using System;
using System.Collections.Generic;

namespace WebsiteTMDT.Data;

public partial class ShippingProvider
{
    public int ProviderId { get; set; }

    public string ProviderName { get; set; } = null!;

    public string? ContactInfo { get; set; }

    public string? TrackingUrl { get; set; }

    public virtual ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
}
