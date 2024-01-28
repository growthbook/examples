using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace GrowthBook.Web.Example.Examples;

[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
public class GrowthBookExampleAttributes
{
    public string Id { get; set; } = "user-employee-123456789";
    public bool LoggedIn { get; set; } = true;
    public bool Employee { get; set; } = true;
    public string Country { get; set; } = "england";
    public string[] DietaryRestrictions { get; set; } = new[] { "gluten_free" };
    public string Version { get; set; } = "1.0.0";
}
