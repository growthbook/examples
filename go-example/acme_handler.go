package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/growthbook/growthbook-golang"
)

// GBFeaturesResponse
// GrowthBook features response
type GBFeaturesResponse struct {
	Status      int             `json:"status"`
	Features    json.RawMessage `json:"features"`
	DateUpdated time.Time       `json:"dateUpdated"`
}

type MealOverrides struct {
	MealType string `json:"meal_type"`
	Dessert  string `json:"dessert"`
}

// Makes a request to GrowthBook's features endpoint, parses the response into
// the GBFeaturesResponse struct, and loads those features into the GrowthBook SDK.
// Also assigns hardcoded growthbook.Attributes to the growthbook.GrowthBook instance
func acmeHandler(w http.ResponseWriter, r *http.Request) {
	// Attributes to evaluate features against
	userAttributes := growthbook.Attributes{
		"id":                  "user-employee-123456789",
		"loggedIn":            true,
		"employee":            true,
		"country":             "france",
		"dietaryRestrictions": [1]string{"gluten_free"},
	}

	// Get JSON from GrowthBook and deserialize it into GBFeaturesResponse struct
	res, err := http.Get("https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8")
	if err != nil {
		fmt.Printf("Error fetching features from GrowthBook: %s \n", err)
		os.Exit(1)
	}
	var featuresResponse GBFeaturesResponse
	err = json.NewDecoder(res.Body).Decode(&featuresResponse)
	if err != nil {
		fmt.Printf("Error decoding JSON: %s \n", err)
		os.Exit(1)
	}
	features := growthbook.ParseFeatureMap(featuresResponse.Features)

	// This will get called when the font_colour experiment below is evaluated
	trackingCallback := func(experiment *growthbook.Experiment, result *growthbook.ExperimentResult) {
		fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s \n", experiment.Key, result.VariationID, result.Value)
	}

	// Create a growthbook.Context instance with the features and attributes
	context := growthbook.NewContext().
		WithFeatures(features).
		WithAttributes(userAttributes).
		WithTrackingCallback(trackingCallback)

	// Create a growthbook.GrowthBook instance
	gb := growthbook.New(context)

	// Get some values
	// string value
	bannerText := gb.Feature("banner_text").GetValueWithDefault("???")
	// checking if any value type is on
	useDarkMode := gb.Feature("dark_mode").On
	// JSON type
	defaultMealType := MealOverrides{
		MealType: "standard",
		Dessert:  "Apple Pie",
	}
	mealOverrides := gb.Feature("meal_overrides_gluten_free").GetValueWithDefault(defaultMealType)

	// Evaluate an inline experiment
	experiment := growthbook.
		NewExperiment("font_colour").
		WithVariations("red", "orange", "yellow", "green", "blue", "purple")
	result := gb.Run(experiment)
	var usernameColour = result.Value.(string)

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")

	// Adding debugging data to the response
	year, month, day := featuresResponse.DateUpdated.Date()

	data := map[string]any{
		"greeting":       bannerText,
		"dark_mode":      useDarkMode,
		"font_colour":    usernameColour,
		"meal_overrides": mealOverrides,
		// This section is provided for debugging purposes
		"debug": map[string]any{
			"date_updated": map[string]any{
				"month": month,
				"year":  year,
				"date":  day,
				"time":  featuresResponse.DateUpdated.Format(time.Kitchen),
			},
			"status": featuresResponse.Status,
			// "features": featuresResponse["features"], // See all features, for debugging
		},
	}

	json.NewEncoder(w).Encode(data)
}
