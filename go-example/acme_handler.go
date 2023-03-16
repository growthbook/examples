package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/growthbook/growthbook-golang"
)

func acmeHandler(w http.ResponseWriter, r *http.Request) {
	res, err := http.Get("https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8")
	if err != nil {
		fmt.Printf("Error fetching features from GrowthBook: %s \n", err)
		os.Exit(1)
	}

	var featuresResponse map[string]interface{}

	err = json.NewDecoder(res.Body).Decode(&featuresResponse)
	if err != nil {
		fmt.Printf("Error decoding JSON: %s \n", err)
		os.Exit(1)
	}

	featureBytes, err := json.Marshal(featuresResponse["features"])
	features := growthbook.ParseFeatureMap(featureBytes)

	context := growthbook.NewContext().WithFeatures(features).WithAttributes(growthbook.Attributes{
		"id":       "user-employee-123456789",
		"loggedIn": true,
		"employee": true,
		"country":  "france",
	})

	gb := growthbook.New(context)

	bannerText := gb.Feature("banner_text").GetValueWithDefault("???")
	useDarkMode := gb.Feature("dark_mode").On

	// Response
	w.Header().Set("Content-Type", "application/json")
	data := map[string]any{
		"greeting":  bannerText,
		"dark_mode": useDarkMode,
		// "features": featuresResponse["features"], // See all features, for debugging
	}

	json.NewEncoder(w).Encode(data)
}
