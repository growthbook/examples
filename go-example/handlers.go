package main

import (
	"encoding/json"
	"net/http"

	"github.com/growthbook/growthbook-golang"
)

// A "wrapped" handler is passed a GrowthBook instance already set up
// with features and attributes based on the incoming request, and
// returns a map to be converted to JSON in the response.
type wrappedFunc func(gb *growthbook.GrowthBook) map[string]any

func wrapHandler(gb *growthbook.GrowthBook, f wrappedFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Retrieve attributes for user based on request parameters.
		userAttributes := userData(r)

		// Inject the user attributes into the GrowthBook instance and
		// call the wrapped handler function.
		result := f(gb.WithAttributes(userAttributes))

		// Write response: either 200 OK with JSON body, or 400 Bad Request.
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
	})
}

func greetingHandler(gb *growthbook.GrowthBook) map[string]any {
	bannerText := gb.EvalFeature("banner_text").GetValueWithDefault("???")
	return map[string]any{"greeting": bannerText}
}

func darkModeHandler(gb *growthbook.GrowthBook) map[string]any {
	darkMode := gb.IsOn("dark_mode")
	return map[string]any{"dark_mode": darkMode}
}

func mealOverridesHandler(gb *growthbook.GrowthBook) map[string]any {
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides := gb.Feature("meal_overrides_gluten_free").GetValueWithDefault(defaultMealType)
	return map[string]any{"meal_overrides": mealOverrides}
}

func experimentHandler(gb *growthbook.GrowthBook) map[string]any {
	// Evaluate an inline experiment
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result := gb.Run(experiment)
	var usernameColour = result.Value.(string)
	return map[string]any{"font_colour": usernameColour}
}
