package main

import (
	"fmt"
	"net/http"

	"github.com/growthbook/growthbook-golang"
)

var gb *growthbook.GrowthBook

func main() {
	growthbook.SetLogger(&growthbook.DevLogger{})

	server := http.NewServeMux()

	// This will get called when the font_colour experiment below is
	// evaluated.
	trackingCallback := func(experiment *growthbook.Experiment, result *growthbook.Result) {
		fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s \n",
			experiment.Key, result.VariationID, result.Value)
	}

	// Create a GrowthBook context with settings to allow for retrieving
	// features from the GrowthBook API.
	context := growthbook.NewContext().
		WithClientKey("sdk-JA5F3MFuaIBB4z").
		WithTrackingCallback(trackingCallback)

	// Create a GrowthBook instance.
	gb = growthbook.New(context)

	// Load features from GrowthBook API with automatic updating.
	gb.LoadFeatures(&growthbook.FeatureRepoOptions{AutoRefresh: true})

	// Set up handlers using utility wrapper.
	server.Handle("/greeting", wrapHandler(gb, greetingHandler))
	server.Handle("/dark_mode", wrapHandler(gb, darkModeHandler))
	server.Handle("/meal_overrides", wrapHandler(gb, mealOverridesHandler))
	server.Handle("/experiment", wrapHandler(gb, experimentHandler))
	server.Handle("/acme", wrapHandler(gb, acmeHandler))

	fmt.Println(`Endpoints:
   http://localhost:8070/greeting        (string value)
   http://localhost:8070/dark_mode       (boolean value)
   http://localhost:8070/meal_overrides  (compound value)
   http://localhost:8070/experiment      (in-line experiment)
   http://localhost:8070/acme            (everything at once!)

Add '?user=...' for user-specific results. For example:

   http://localhost:8070/meal_overrides?user=eric

Known users are: eric, elke, xiaofeng, luisa`)
	fmt.Println()

	http.ListenAndServe(":8070", server)
}
