package main

import (
	"context"
	"fmt"
	"net/http"

	"golang.org/x/exp/slog"

	"github.com/growthbook/growthbook-golang"
)

var gb *growthbook.Client

func main() {
	// Log GrowthBook messages to slog default logger.
	growthbook.SetLogger(slog.Default())

	server := http.NewServeMux()

	// This will get called when the font_colour experiment below is
	// evaluated.
	trackingCallback := func(cxt context.Context,
		experiment *growthbook.Experiment, result *growthbook.Result) {
		fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s \n",
			experiment.Key, result.VariationID, result.Value)
	}

	// Create a GrowthBook client instance with settings to allow for
	// retrieving features from the GrowthBook API.
	gb = growthbook.NewClient(&growthbook.Options{
		ClientKey:         "sdk-JA5F3MFuaIBB4z",
		ExperimentTracker: &growthbook.ExperimentCallback{trackingCallback},
	})

	// Load features from GrowthBook API with automatic updating.
	err := gb.LoadFeatures(&growthbook.FeatureRepoOptions{AutoRefresh: true})
	if err != nil {
		panic(err)
	}

	// Set up handlers using utility wrapper.
	server.Handle("/greeting", wrapHandler(gb, greetingHandler))
	server.Handle("/dark_mode", wrapHandler(gb, darkModeHandler))
	server.Handle("/meal_overrides", wrapHandler(gb, mealOverridesHandler))
	server.Handle("/experiment", wrapHandler(gb, experimentHandler))
	server.Handle("/acme", wrapHandler(gb, acmeHandler))

	fmt.Println(instructions)
	fmt.Println()
	fmt.Println("---- slog messages start here ----")
	fmt.Println()

	http.ListenAndServe(":8070", server)
}

const instructions = `Endpoints:
   http://localhost:8070/greeting        (string value)
   http://localhost:8070/dark_mode       (boolean value)
   http://localhost:8070/meal_overrides  (compound value)
   http://localhost:8070/experiment      (in-line experiment)
   http://localhost:8070/acme            (everything at once!)

Add '?user=...' for user-specific results. For example:

   http://localhost:8070/meal_overrides?user=eric

Known users are: eric, elke, xiaofeng, luisa`
