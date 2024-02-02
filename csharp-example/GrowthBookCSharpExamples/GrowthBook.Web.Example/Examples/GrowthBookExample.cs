using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text.Json;

namespace GrowthBook.Web.Example.Examples;

/// <summary>
/// Represents the base class for all GrowthBook examples.
/// </summary>
public abstract class GrowthBookExample
{
    /// <summary>
    /// All feature names for the default example feature set.
    /// </summary>
    public static class FeatureName
    {
        public const string BannerText = "banner_text";
        public const string DarkMode = "dark_mode";
        public const string AppName = "app_name";
        public const string DonutPrice = "donut_price";
        public const string Greeting = "greeting";
        public const string RandomString = "random_string";
        public const string MealOverridesGlutenFree = "meal_overrides_gluten_free";        
    }

    /// <summary>
    /// All feature default values for the default example feature set.
    /// </summary>
    public static class FeatureDefaultValue
    {
        public const string Unknown = "???";
        public const decimal UnknownPrice = 9.99M;
    }

    public static class ExampleAttribute
    {
        public const string Id = "user-123456789";

        public static class Country
        {
            public const string England = "england";
            public const string France = "france";
            public const string Spain = "spain";
        }

        public static class Version
        {
            public const string V1 = "1.0.0";
            public const string V2 = "2.0.0";
        }

        public static class DietaryRestriction
        {
            public const string GlutenFree = "gluten_free";
        }
    }

    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class FeatureMeal
    {
        [JsonProperty("meal_type")]
        public string MealType { get; set; } = "Unknown";
        public string Dessert { get; set; } = "Unknown";
    }

    /// <summary>
    /// All keys for values that can be loaded from an <see cref="IConfiguration"/> instance.
    /// </summary>
    public static class ExampleConfigurationKey
    {
        /// <summary>
        /// The client key used in all examples to retrieve features from the API.
        /// </summary>
        public const string GrowthBookExampleClientKey = nameof(GrowthBookExampleClientKey);

        /// <summary>
        /// The decryption key for any encrypted features. The default example feature set does not contain
        /// any encrypted features, but this is provided here in the case where you would like to use your 
        /// own client key and decryption key to test out your own encrypted features.
        /// </summary>
        public const string GrowthBookExampleDecryptionKey = nameof(GrowthBookExampleDecryptionKey);
    }

    /// <summary>
    /// Gets the endpoint path for this example. The Swagger page will invoke this (or you can use your own HTTP client to do so).
    /// </summary>
    public abstract string EndpointPath { get; }

    /// <summary>
    /// Gets the method name assigned to this example. This is to allow ASP.Net Core to invoke things appropriately..
    /// </summary>
    public abstract string MethodName { get; }

    /// <summary>
    /// The body of the example. At a minimum, will have the execution of the GrowthBook feature evaluation.
    /// </summary>
    /// <returns>The response that is created through running a GrowthBook feature evaluation. This instance is returned to the HTTP request caller.</returns>
    public abstract Task<GrowthBookExampleResponse?> Run();

    /// <summary>
    /// Gets all types within the executing assembly that are GrowthBook examples.
    /// </summary>
    /// <returns>A sequence of types of GrowthBook examples.</returns>
    public static IEnumerable<Type> GetAllExampleTypes()
    {
        return from type in Assembly.GetExecutingAssembly().GetTypes()
               where !type.IsAbstract && type.BaseType == typeof(GrowthBookExample)
               select type;
    }

    /// <summary>
    /// Gets all instances of GrowthBook examples. These are resolved through the given <see cref="IServiceProvider"/>.
    /// </summary>
    /// <param name="services">The existing service provider for the application.</param>
    /// <returns>A sequence of instances of GrowthBook examples.</returns>
    public static IEnumerable<GrowthBookExample> GetAllExamples(IServiceProvider services)
    {
        return from type in GetAllExampleTypes()
               select (GrowthBookExample)services.GetRequiredService(type);
    }
}
