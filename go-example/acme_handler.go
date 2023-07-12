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

func acmeHandler(gb *growthbook.Client, attrs growthbook.Attributes) map[string]any {
	// String value.
	bannerText := gb.EvalFeature("banner_text", attrs).GetValueWithDefault("???")

	// Boolean feature flag.
	useDarkMode := gb.EvalFeature("dark_mode", attrs).On

	// Compound value.
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides := gb.EvalFeature("meal_overrides_gluten_free", attrs).
		GetValueWithDefault(defaultMealType)

	// Evaluate an inline experiment.
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result := gb.Run(experiment, attrs)
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
