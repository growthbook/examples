using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GBE = GrowthBook.Web.Example.Examples.GrowthBookExample;

namespace GrowthBook.Web.Example.Examples;

/// <summary>
/// Represents a concrete type that corresponds to a GrowthBook attributes JSON object.
/// Serializing this type as a <see cref="JObject"/> will allow it to be included
/// in a GrowthBook Context for use during feature evaluation.
/// </summary>
[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
public class GrowthBookExampleAttributes
{
    public string Id { get; set; } = GBE.ExampleAttribute.Id;
    public bool LoggedIn { get; set; } = true;
    public bool Employee { get; set; } = true;
    public string Country { get; set; } = GBE.ExampleAttribute.Country.England;
    public string[] DietaryRestrictions { get; set; } = new[] { GBE.ExampleAttribute.DietaryRestriction.GlutenFree };
    public string Version { get; set; } = GBE.ExampleAttribute.Version.V1;
}
