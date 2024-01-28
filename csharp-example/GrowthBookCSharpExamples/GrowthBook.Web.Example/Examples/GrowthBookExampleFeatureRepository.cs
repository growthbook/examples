
namespace GrowthBook.Web.Example.Examples;

/// <summary>
/// Quick example of a feature repository. This has no support for retrieval options and will always attempt to refresh
/// directly from the refresh worker.
/// </summary>
public class GrowthBookExampleFeatureRepository : IGrowthBookFeatureRepository
{
    private readonly IGrowthBookFeatureRefreshWorker _refreshWorker;

    public GrowthBookExampleFeatureRepository(IGrowthBookFeatureRefreshWorker refreshWorker)
    {
        _refreshWorker = refreshWorker;
    }

    public void Cancel() => throw new InvalidOperationException("The example implementation does not allow cancelling a repository action");

    public async Task<IDictionary<string, Feature>> GetFeatures(GrowthBookRetrievalOptions options = null, CancellationToken? cancellationToken = null)
    {
        return await _refreshWorker.RefreshCacheFromApi();
    }
}
