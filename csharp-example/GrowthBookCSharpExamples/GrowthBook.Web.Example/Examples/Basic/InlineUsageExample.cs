
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
        var response = await GetFeaturesFromApi();

        if (response is null || response.Features is null)
        {
            throw new InvalidOperationException("Unable to retrieve features from the GrowthBook API");
        }

        var attributes = new JObject
        {
            ["id"] = "user-employee-123456789",
            ["loggedIn"] = true,
            ["employee"] = true,
            ["country"] = "france",
            ["dietaryRestrictions"] = new JArray("gluten_free"),
            ["version"] = "1.0.0"
        };

        var context = new Context
        {
            ClientKey = _config[ExampleConfigurationKey.GrowthBookExampleApiKey],
            DecryptionKey = _config[ExampleConfigurationKey.GrowthBookExampleDecryptionKey],
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
