
using GrowthBook.Api;
using GrowthBook.Api.Extensions;
using Microsoft.Extensions.Logging.Abstractions;
using Newtonsoft.Json;
using static GrowthBook.Web.Example.Examples.GrowthBookExample;

namespace GrowthBook.Web.Example.Examples;

/// <summary>
/// Quick example of a custom feature refresh worker. Unlike the default implementation, this example has no support for 
/// near-realtime server sent events and always fetches from the GrowthBook API when the cache is expired.
/// </summary>
public class GrowthBookExampleFeatureRefreshWorker : IGrowthBookFeatureRefreshWorker
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly GrowthBookConfigurationOptions _config;
    private readonly IGrowthBookFeatureCache _cache;

    public GrowthBookExampleFeatureRefreshWorker(IGrowthBookFeatureCache cache, IHttpClientFactory httpClientFactory, GrowthBookConfigurationOptions config)
    {
        _cache = cache;
        _httpClientFactory = httpClientFactory;
        _config = config;
    }

    public void Cancel() => throw new InvalidOperationException("The example implementation does not allow cancelling a refresh action");

    public async Task<IDictionary<string, Feature>> RefreshCacheFromApi(CancellationToken? cancellationToken = null)
    {
        if (!_cache.IsCacheExpired)
        {
            return await _cache.GetFeatures(CancellationToken.None);
        }

        var httpClient = _httpClientFactory.CreateClient(ConfiguredClients.DefaultApiClient);
        var url = Path.Combine("https://cdn.growthbook.io/api/features/", _config.ClientKey);

        var response = await httpClient.GetFeaturesFrom(url, NullLogger.Instance, new(), CancellationToken.None);

        await _cache.RefreshWith(response.Features);

        return response.Features;
    }
}
