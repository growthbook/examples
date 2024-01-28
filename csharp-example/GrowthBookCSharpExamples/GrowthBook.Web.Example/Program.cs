// Enabling partial customization will use the default repository and refresh worker with the custom example cache during dependency resolution.
//#define PARTIAL_CUSTOMIZATION

// Enabling complete customization will use the custom example repository, refresh worker, and cache during dependency resolution.
//#define COMPLETE_CUSTOMIZATION

using GB = GrowthBook;
using GrowthBook.Web.Example.Examples;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// We are adding a console logger by default and including a logging factory override in the Context
// for these examples in order to more clearly help you see what is happening within the SDK during a given example.
// Overriding logging for the SDK like this is optional and logging will be disabled by default otherwise to minimize noise.

builder.Services.AddLogging(builder => builder.AddConsole());

// We're injecting an IHttpClientFactory into the examples/example refresh worker, which will allow an example or
// GrowthBook refresh worker to load features from the API either on an as-needed basis when its cache expires or in
// near-realtime with server sent events (if preferred and enabled), and so we're adding that into the dependency
// injection collection here.

builder.Services.AddHttpClient();

// Registering GrowthBook SDK types for dependency injection into the examples. Depending on your implementation, this may not
// be necessary for you to do (for example, if you are manually creating/populating a Context and GrowthBook instance).

builder.Services

    // Only the Context and GrowthBook types are required to be created in order for GrowthBook to function appropriately in any
    // standard use case. We're using the GrowthBookExampleContextService as a placeholder for an implementation that would load your
    // own custom data and populate the Context accordingly for injection into the GrowthBook instance.

    .AddTransient<GrowthBookExampleContextService>()
    .AddTransient<GB.Context>(x => x.GetRequiredService<GrowthBookExampleContextService>().CurrentContext)
    .AddTransient<GB.IGrowthBook, GB.GrowthBook>()

    // When using your own custom feature repository, cache, or refresh worker, registering those here may help minimize your
    // injection code elsewhere. For example, if you have written a custom Redis-backed IGrowthBookFeatureCache that you would like
    // to use instead of the default in-memory caching implementation, you would most likely want to include that here along with the
    // appropriate feature repository and refresh worker in order to more easily include that dependency chain when creating and
    // populating your Context instance.

    .AddTransient<GB.GrowthBookConfigurationOptions>(x =>
    {
        var config = x.GetRequiredService<IConfiguration>();

        return new()
        {
            ClientKey = config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleApiKey],
            DecryptionKey = config[GrowthBookExample.ExampleConfigurationKey.GrowthBookExampleDecryptionKey],
        };
    })

    // In order to test out injection of a custom cache with the default implementation of the repository and refresh worker,
    // enable the PARTIAL_CUSTOMIZATION flag. For an entirely custom replacement of all three of those, enable
    // the COMPLETE_CUSTOMIZATION flag instead. Leaving both disabled will use all of the default implementations for all three.

#if PARTIAL_CUSTOMIZATION
    .AddTransient<GB.IGrowthBookFeatureCache, GrowthBookExampleFeatureCache>()
    .AddTransient<GB.IGrowthBookFeatureRepository, GB.Api.FeatureRepository>()
    .AddTransient<GB.IGrowthBookFeatureRefreshWorker, GB.Api.FeatureRefreshWorker>()
#elif COMPLETE_CUSTOMIZATION
    .AddTransient<GB.IGrowthBookFeatureCache, GrowthBookExampleFeatureCache>()
    .AddTransient<GB.IGrowthBookFeatureRepository, GrowthBookExampleFeatureRepository>()
    .AddTransient<GB.IGrowthBookFeatureRefreshWorker, GrowthBookExampleFeatureRefreshWorker>()
#endif
    ;

// Registering GrowthBook examples for dependency injection.

foreach(var exampleType in GrowthBookExample.GetAllExampleTypes())
{
    builder.Services.AddTransient(exampleType);
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Automatically map all of the examples to individual endpoints
// which can be executed via the Swagger page for testing.

foreach (var example in GrowthBookExample.GetAllExamples(app.Services))
{
    app.MapGet(example.EndpointPath, example.Run)
    .WithName(example.MethodName)
    .WithOpenApi();
}

app.Run();