

using GrowthBook.Web.Example.Extensions;
using Newtonsoft.Json.Linq;
using System;

namespace GrowthBook.Web.Example.Examples.Basic;

public class InjectionUsageExample : GrowthBookExample
{
    private readonly ILogger<GrowthBookExample> _logger;
    private readonly IGrowthBook _growthBook;

    public InjectionUsageExample(ILogger<GrowthBookExample> logger, IGrowthBook growthBook)
    {
        _logger = logger;
        _growthBook = growthBook;
    }

    public override string EndpointPath => "/injection-usage";

    public override string MethodName => "InjectionUsage";

    public override async Task<GrowthBookExampleResponse?> Run()
    {
        // Everything in this example is already injected into the IGrowthBook instance, including the attributes
        // and other Context data (pulled from GrowthBookExampleContextService during dependency resolution),
        // which will either use the default feature repository, refresh worker, and cache or the custom examples
        // depending on which pre-processor flags (if any) in Program.cs you've enabled.
        
        // Once things are all set up, the only thing necessary to do is to call LoadFeatures() because that will
        // perform the initial feature retrieval/caching that will inform any feature evaluations.

        await _growthBook.LoadFeatures();

        return _growthBook.GetFeatureExampleResponse();
    }
}
