package main

import (
	"net/http"
	"time"

	"github.com/growthbook/growthbook-golang"
	"github.com/labstack/echo/v4"
)

// Handles multiple feature lookups in one handler.

func acmeHandler(c echo.Context) error {
	cc := c.(*CustomContext)

	// String value.
	bannerText, err := cc.GB.EvalFeature("banner_text", cc.Attributes)
	if err != nil {
		return err
	}

	// Boolean feature flag.
	useDarkMode, err := cc.GB.EvalFeature("dark_mode", cc.Attributes)
	if err != nil {
		return err
	}

	// Compound value.
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides, err := cc.GB.EvalFeature("meal_overrides_gluten_free", cc.Attributes)
	if err != nil {
		return err
	}

	// Evaluate an inline experiment.
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result, err := cc.GB.Run(experiment, cc.Attributes)
	if err != nil {
		return err
	}
	var usernameColour = result.Value.(string)

	// Debugging data for the response.
	year, month, day := cc.GB.LatestFeatureUpdate().Date()

	retval := map[string]any{
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
				"time":  cc.GB.LatestFeatureUpdate().Format(time.Kitchen),
			},
			"features": cc.GB.Features(), // See all features, for debugging.
		},
	}

	return c.JSON(http.StatusOK, retval)
}
