namespace GrowthBook.Web.Example.Examples;

public record GrowthBookExampleResponse(string BannerText, string AppName, string RandomString, string Greeting, bool IsDarkModeEnabled, bool IsMealOverrideOn, GrowthBookExample.FeatureMeal Meal, decimal DonutPrice);
