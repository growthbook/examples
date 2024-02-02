using Newtonsoft.Json.Linq;
using GBE = GrowthBook.Web.Example.Examples.GrowthBookExample;

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

    protected Context CreateContext()
    {
        var attributes = CreateAttributes();

        // We need to include the ClientKey value here because the examples that use dependency injection will be
        // using the GrowthBook.LoadFeatures() call which means that it will be solely responsible for loading the features
        // from the GrowthBook API. In the case where the default feature repository is used, due to no override instance
        // being provided in the Context, it will need to use that value to retrieve things appropriately. In the case where a
        // custom feature repository is used, it may potentially obtain the client key in a different way.

        return new()
        {
            Attributes = JObject.FromObject(attributes),
            ClientKey = _config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleClientKey],
            DecryptionKey = _config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleDecryptionKey],
            LoggerFactory = _loggerFactory,
            FeatureRepository = _featureRepository
        };
    }

    protected GrowthBookExampleAttributes CreateAttributes()
    {
        // These property values differ from the values in the InlineUsage example because this illustrates the
        // way that the rules (if any) that are a part of a given feature can help affect the result by evaluating
        // them against the current attributes.

        return new()
        {
            Id = GBE.ExampleAttribute.Id,
            LoggedIn = false,
            Employee = false,
            Country = GBE.ExampleAttribute.Country.Spain,
            DietaryRestrictions = Array.Empty<string>(),
            Version = GBE.ExampleAttribute.Version.V2
        };
    }
}
