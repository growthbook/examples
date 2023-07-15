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

func acmeHandler(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error) {
	// String value.
	bannerText, err := gb.EvalFeature("banner_text", attrs)
	if err != nil {
		return nil, err
	}

	// Boolean feature flag.
	useDarkMode, err := gb.EvalFeature("dark_mode", attrs)
	if err != nil {
		return nil, err
	}

	// Compound value.
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides, err := gb.EvalFeature("meal_overrides_gluten_free", attrs)
	if err != nil {
		return nil, err
	}

	// Evaluate an inline experiment.
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result, err := gb.Run(experiment, attrs)
	if err != nil {
		return nil, err
	}
	var usernameColour = result.Value.(string)

	// Debugging data for the response.
	year, month, day := gb.LatestFeatureUpdate().Date()

	return map[string]any{
		"greeting":       bannerText.GetValueWithDefault("???"),
		"dark_mode":      useDarkMode.On,
		"font_colour":    usernameColour,
		"meal_overrides": mealOverrides.GetValueWithDefault(defaultMealType),
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
	}, nil
}
