package main

import (
	"time"

	"github.com/growthbook/growthbook-golang"
)

type MealOverrides struct {
	MealType string `json:"meal_type"`
	Dessert  string `json:"dessert"`
}

// Handles multiple feature lookups.

func acmeHandler(gb *growthbook.GrowthBook) map[string]any {
	// String value.
	bannerText := gb.Feature("banner_text").GetValueWithDefault("???")

	// Boolean feature flag.
	useDarkMode := gb.Feature("dark_mode").On

	// Compound value.
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides := gb.Feature("meal_overrides_gluten_free").GetValueWithDefault(defaultMealType)

	// Evaluate an inline experiment.
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result := gb.Run(experiment)
	var usernameColour = result.Value.(string)

	// Debugging data for the response.
	year, month, day := gb.LatestFeatureUpdate().Date()

	return map[string]any{
		"greeting":       bannerText,
		"dark_mode":      useDarkMode,
		"font_colour":    usernameColour,
		"meal_overrides": mealOverrides,
		// This section is provided for debugging purposes.
		"debug": map[string]any{
			"date_updated": map[string]any{
				"month": month,
				"year":  year,
				"date":  day,
				"time":  gb.LatestFeatureUpdate().Format(time.Kitchen),
			},
			"features": gb.Features(), // See all features, for debugging.
		},
	}
}
