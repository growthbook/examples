using GrowthBook.Web.Example.Examples;
using GBE = GrowthBook.Web.Example.Examples.GrowthBookExample;

namespace GrowthBook.Web.Example.Extensions;

public static class GrowthBookExtensions
{
    public static GrowthBookExampleResponse GetFeatureExampleResponse(this IGrowthBook growthBook)
    {
        // The results of the feature evaluations here will depend on what the values in the Context attributes in
        // this GrowthBook instance are set to and how those values correspond to the rules (if any) attached to a given feature.

        var bannerText = growthBook.GetFeatureValue(GBE.FeatureName.BannerText, GBE.FeatureDefaultValue.Unknown);
        var appName = growthBook.GetFeatureValue(GBE.FeatureName.AppName, GBE.FeatureDefaultValue.Unknown);
        var randomString = growthBook.GetFeatureValue(GBE.FeatureName.RandomString, GBE.FeatureDefaultValue.Unknown);
        var greeting = growthBook.GetFeatureValue(GBE.FeatureName.Greeting, GBE.FeatureDefaultValue.Unknown);
        var donutPrice = growthBook.GetFeatureValue(GBE.FeatureName.DonutPrice, GBE.FeatureDefaultValue.UnknownPrice);
        var meal = growthBook.GetFeatureValue(GBE.FeatureName.MealOverridesGlutenFree, new GBE.FeatureMeal());
        var isDarkModeOn = growthBook.IsOn(GBE.FeatureName.DarkMode);
        var isMealOverrideOn = growthBook.IsOn(GBE.FeatureName.MealOverridesGlutenFree);

        return new GrowthBookExampleResponse(bannerText, appName, randomString, greeting, isDarkModeOn, isMealOverrideOn, meal, donutPrice);
    }
}
