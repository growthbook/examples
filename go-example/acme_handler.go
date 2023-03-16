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

// Makes a request to GrowthBook's features endpoint, parses the response into
// the GBFeaturesResponse struct, and loads those features into the GrowthBook SDK.
// Also assigns hardcoded growthbook.Attributes to the growthbook.GrowthBook instance
func acmeHandler(w http.ResponseWriter, r *http.Request) {
	// Attributes to evaluate features against
	userAttributes := growthbook.Attributes{
		"id":       "user-employee-123456789",
		"loggedIn": true,
		"employee": true,
		"country":  "france",
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

	// Create a growthbook.Context instance with the features and attributes
	context := growthbook.NewContext().WithFeatures(features).WithAttributes(userAttributes)
	// Create a growthbook.GrowthBook instance
	gb := growthbook.New(context)

	// Get some values
	bannerText := gb.Feature("banner_text").GetValueWithDefault("???")
	useDarkMode := gb.Feature("dark_mode").On

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")

	// Adding debugging data to the response
	year, month, day := featuresResponse.DateUpdated.Date()

	data := map[string]any{
		"greeting":  bannerText,
		"dark_mode": useDarkMode,
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
