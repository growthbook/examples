

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
        await _growthBook.LoadFeatures();

        return _growthBook.GetFeatureExampleResponse();
    }
}
