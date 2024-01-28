
using GrowthBook.Web.Example.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GrowthBook.Web.Example.Examples.Basic;

public class InlineUsageExample : GrowthBookExample
{
    private sealed class FeaturesResponse
    {
        public Dictionary<string, Feature> Features { get; set; }
        public string EncryptedFeatures { get; set; }
    }

    private readonly ILogger<InlineUsageExample> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILoggerFactory _loggerFactory;
    private readonly IConfiguration _config;

    public InlineUsageExample(ILogger<InlineUsageExample> logger, IHttpClientFactory httpClientFactory, ILoggerFactory loggerFactory, IConfiguration config) 
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _loggerFactory = loggerFactory;
        _config = config;
    }

    public override string EndpointPath => "/inline-usage";
    public override string MethodName => "InlineUsage";

    public override async Task<GrowthBookExampleResponse?> Run()
    {
        // If you decide not to utilize the GrowthBook.LoadFeatures() call, which will use the default retrieval and
        // caching implementation to get the features (and subscribe to near-realtime feature updates, if preferred),
        // then you will need to load the features directly from the API yourself.

        var response = await GetFeaturesFromApi();

        if (response is null || response.Features is null)
        {
            throw new InvalidOperationException("Unable to retrieve features from the GrowthBook API");
        }

        // These property values differ from the values in the InjectionUsage example because this illustrates the
        // way that the rules (if any) that are a part of a given feature can help affect the result.

        var attributes = new JObject
        {
            ["id"] = "user-employee-123456789",
            ["loggedIn"] = true,
            ["employee"] = true,
            ["country"] = "france",
            ["dietaryRestrictions"] = new JArray("gluten_free"),
            ["version"] = "1.0.0"
        };

        // The Context contains all of the information that a given GrowthBook feature evaluation will need.
        // If manually loading the features, as in this example, it is only required to set the Attributes and
        // Features properties on the Context.
        
        // We're adding in the logging override here as well purely to help make it a little more clear what
        // operations the SDK is taking for each evaluation, but you may want to either omit this or ensure that your
        // log levels are set to at least Warning or Error in order to avoid flooding your logs with SDK operations.

        var context = new Context
        {
            Attributes = attributes,
            Features = response.Features,
            LoggerFactory = _loggerFactory
        };

        var growthBook = new GrowthBook(context);

        return growthBook.GetFeatureExampleResponse();
    }

    private async Task<FeaturesResponse?> GetFeaturesFromApi()
    {
        var apiKey = _config[ExampleConfigurationKey.GrowthBookExampleApiKey];
        var url = Path.Combine("https://cdn.growthbook.io/api/features/", apiKey);

        var httpClient = _httpClientFactory.CreateClient();
        var response = await httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Received non-success status code '{response.StatusCode}' from endpoint path '{EndpointPath}'");
        }

        var json = await response.Content.ReadAsStringAsync();

        return JsonConvert.DeserializeObject<FeaturesResponse>(json);
    }
}
