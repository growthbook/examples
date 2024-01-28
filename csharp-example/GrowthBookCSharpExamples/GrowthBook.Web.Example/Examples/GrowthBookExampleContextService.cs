using Newtonsoft.Json.Linq;

namespace GrowthBook.Web.Example.Examples;

public class GrowthBookExampleContextService
{
    private readonly IConfiguration _config;
    private readonly ILoggerFactory _loggerFactory;
    private readonly IGrowthBookFeatureRepository _featureRepository;

    public GrowthBookExampleContextService(IConfiguration config, ILoggerFactory loggerFactory, IGrowthBookFeatureRepository featureRepository = null)
    {
        _config = config;
        _loggerFactory = loggerFactory;
        _featureRepository = featureRepository;
    }

    public Context CurrentContext => CreateContext();

    protected virtual Context CreateContext()
    {
        var attributes = CreateAttributes();

        return new()
        {
            Attributes = JObject.FromObject(attributes),
            ClientKey = _config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleApiKey],
            DecryptionKey = _config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleDecryptionKey],
            LoggerFactory = _loggerFactory,
            FeatureRepository = _featureRepository
        };
    }

    protected virtual GrowthBookExampleAttributes CreateAttributes()
    {
        // These property values differ from the values in the InlineUsage example because this illustrates the
        // way that the rules (if any) that are a part of a given feature can help affect the result.

        return new()
        {
            Id = "user-nonemployee-123456789",
            LoggedIn = false,
            Employee = false,
            Country = "spain",
            DietaryRestrictions = new[] { "gluten_free" },
            Version = "2.0.0"
        };
    }
}
