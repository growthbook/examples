using GrowthBook.Web.Example.Examples;

namespace GrowthBook.Web.Example.Extensions;

public static class GrowthBookExtensions
{
    public static GrowthBookExampleResponse GetFeatureExampleResponse(this IGrowthBook growthBook)
    {
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
