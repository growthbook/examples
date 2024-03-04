package main

import (
	"context"
	"net/http"

	"github.com/growthbook/growthbook-golang"
	"github.com/labstack/echo/v4"
)

// All of the handlers here are passed a custom context that contains
// both a GrowthBook client instance and a set of user attributes.

func greetingHandler(c echo.Context) error {
	cc := c.(*CustomContext)

	// Evaluate a simple string-valued feature.
	bannerText, err := cc.GB.EvalFeature("banner_text", cc.Attributes)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK,
		map[string]any{"greeting": bannerText.GetValueWithDefault("???")})
}

func darkModeHandler(c echo.Context) error {
	cc := c.(*CustomContext)

	// Evaluate a simple boolean-valued feature.
	darkMode, err := cc.GB.IsOn("dark_mode", cc.Attributes)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, map[string]any{"dark_mode": darkMode})
}

func mealOverridesHandler(c echo.Context) error {
	cc := c.(*CustomContext)

	// Evaluate a complex feature.
	mealOverrides, err := cc.GB.EvalFeature("meal_overrides_gluten_free", cc.Attributes)
	if err != nil {
		return err
	}

	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	return c.JSON(http.StatusOK,
		map[string]any{"meal_overrides": mealOverrides.GetValueWithDefault(defaultMealType)})
}

func experimentHandler(c echo.Context) error {
	cc := c.(*CustomContext)

	// Evaluate an inline experiment.
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result, err := cc.GB.RunContext(context.Background(), experiment, cc.Attributes, cc.User)
	if err != nil {
		return err
	}
	var usernameColour = result.Value.(string)
	return c.JSON(http.StatusOK, map[string]any{"font_colour": usernameColour})
}
