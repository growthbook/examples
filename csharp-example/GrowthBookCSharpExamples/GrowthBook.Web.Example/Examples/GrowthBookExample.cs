using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text.Json;

namespace GrowthBook.Web.Example.Examples;

public abstract class GrowthBookExample
{
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

    public static class FeatureDefaultValue
    {
        public const string Unknown = "???";
        public const decimal UnknownPrice = 999M;
    }

    public static class ExampleConfigurationKey
    {
        public const string GrowthBookExampleApiKey = nameof(GrowthBookExampleApiKey);
        public const string GrowthBookExampleDecryptionKey = nameof(GrowthBookExampleDecryptionKey);
    }

    public abstract string EndpointPath { get; }
    public abstract string MethodName { get; }

    public abstract Task<GrowthBookExampleResponse?> Run();

    public static IEnumerable<Type> GetAllExampleTypes()
    {
        return from type in Assembly.GetExecutingAssembly().GetTypes()
               where !type.IsAbstract && type.BaseType == typeof(GrowthBookExample)
               select type;
    }

    public static IEnumerable<GrowthBookExample> GetAllExamples(IServiceProvider services)
    {
        return from type in GetAllExampleTypes()
               select (GrowthBookExample)services.GetRequiredService(type);
    }
}
