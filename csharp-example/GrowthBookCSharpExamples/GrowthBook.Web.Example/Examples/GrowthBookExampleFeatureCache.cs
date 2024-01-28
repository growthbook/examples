
using System.Collections.Concurrent;

namespace GrowthBook.Web.Example.Examples;

/// <summary>
/// Quick example of a custom in-memory feature cache. This cache is always treated as expired if it has no features 
/// but then retains them indefinitely once added. 
/// </summary>
public class GrowthBookExampleFeatureCache : IGrowthBookFeatureCache
{
    private ConcurrentDictionary<string, Feature> _cachedFeatures = new();

    public int FeatureCount => _cachedFeatures.Count;

    public bool IsCacheExpired => FeatureCount == 0;

    public Task<IDictionary<string, Feature>> GetFeatures(CancellationToken? cancellationToken = null)
    {
        return Task.FromResult<IDictionary<string, Feature>>(_cachedFeatures);
    }

    public Task RefreshWith(IDictionary<string, Feature> features, CancellationToken? cancellationToken = null)
    {
        _cachedFeatures = new(features);        

        return Task.CompletedTask;
    }
}
