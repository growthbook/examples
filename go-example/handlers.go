package main

import (
	"encoding/json"
	"net/http"

	"github.com/growthbook/growthbook-golang"
)

// A "wrapped" handler is passed a GrowthBook instance already set up
// with features and attributes based on the incoming request, and
// returns a map to be converted to JSON in the response.
type wrappedFunc func(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error)

func wrapHandler(gb *growthbook.Client, f wrappedFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Retrieve attributes for user based on request parameters.
		userAttributes := userData(r)

		// Inject the user attributes into the GrowthBook instance and
		// call the wrapped handler function.
		result, err := f(gb, userAttributes)

		// Write response: either 200 OK with JSON body, or 400 Bad Request.
		if err == nil {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(result)
		} else {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
		}
	})
}

func greetingHandler(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error) {
	bannerText, err := gb.EvalFeature("banner_text", attrs)
	if err != nil {
		return nil, err
	}
	return map[string]any{"greeting": bannerText.GetValueWithDefault("???")}, nil
}

func darkModeHandler(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error) {
	darkMode, err := gb.IsOn("dark_mode", attrs)
	if err != nil {
		return nil, err
	}
	return map[string]any{"dark_mode": darkMode}, nil
}

func mealOverridesHandler(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error) {
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides, err := gb.EvalFeature("meal_overrides_gluten_free", attrs)
	if err != nil {
		return nil, err
	}
	return map[string]any{"meal_overrides": mealOverrides.GetValueWithDefault(defaultMealType)}, nil
}

func experimentHandler(gb *growthbook.Client, attrs growthbook.Attributes) (map[string]any, error) {
	// Evaluate an inline experiment
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result, err := gb.Run(experiment, attrs)
	if err != nil {
		return nil, err
	}
	var usernameColour = result.Value.(string)
	return map[string]any{"font_colour": usernameColour}, nil
}
