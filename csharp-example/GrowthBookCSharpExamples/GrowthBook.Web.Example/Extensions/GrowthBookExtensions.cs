using GrowthBook.Web.Example.Examples;

namespace GrowthBook.Web.Example.Extensions;

public static class GrowthBookExtensions
{
    public static GrowthBookExampleResponse GetFeatureExampleResponse(this IGrowthBook growthBook)
    {
        // The results of the feature evaluations here will depend on what the values in the Context attributes in
        // this GrowthBook instance are set to and how those values correspond to the rules (if any) attached to a given feature.

        var bannerText = growthBook.GetFeatureValue(GrowthBookExample.FeatureName.BannerText, GrowthBookExample.FeatureDefaultValue.Unknown);
        var appName = growthBook.GetFeatureValue(GrowthBookExample.FeatureName.AppName, GrowthBookExample.FeatureDefaultValue.Unknown);
        var randomString = growthBook.GetFeatureValue(GrowthBookExample.FeatureName.RandomString, GrowthBookExample.FeatureDefaultValue.Unknown);
        var greeting = growthBook.GetFeatureValue(GrowthBookExample.FeatureName.Greeting, GrowthBookExample.FeatureDefaultValue.Unknown);
        var donutPrice = growthBook.GetFeatureValue(GrowthBookExample.FeatureName.DonutPrice, GrowthBookExample.FeatureDefaultValue.UnknownPrice);
        var isDarkModeOn = growthBook.IsOn(GrowthBookExample.FeatureName.DarkMode);
        var isMealOverrides = growthBook.IsOn(GrowthBookExample.FeatureName.MealOverridesGlutenFree);

        return new GrowthBookExampleResponse(bannerText, appName, randomString, greeting, isDarkModeOn, isMealOverrides, donutPrice);
    }
}
