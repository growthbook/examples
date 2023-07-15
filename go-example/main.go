package main

import (
	"fmt"
	"net/http"

	"github.com/growthbook/growthbook-golang"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var gb *growthbook.Client

func main() {
	// Set up zerolog logger (see below for definition).
	growthbook.SetLogger(&logger{})

	server := http.NewServeMux()

	// This will get called when the font_colour experiment below is
	// evaluated.
	trackingCallback := func(experiment *growthbook.Experiment, result *growthbook.Result) {
		fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s \n",
			experiment.Key, result.VariationID, result.Value)
	}

	// Create a GrowthBook client instance with settings to allow for
	// retrieving features from the GrowthBook API.
	gb := growthbook.NewClient(&growthbook.Options{
		ClientKey:        "sdk-JA5F3MFuaIBB4z",
		TrackingCallback: trackingCallback,
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
	fmt.Println("---- zerolog messages start here ----")
	fmt.Println()

	http.ListenAndServe(":8070", server)
}

// Wrapper to convert GrowthBook logger to zerolog.
type logger struct{}

// Write a GrowthBook log message to zerolog in a simple way.
func (l *logger) Handle(msg *growthbook.LogMessage) {
	var ev *zerolog.Event

	// Convert log level.
	switch msg.Level {
	case growthbook.Error:
		ev = log.Error()
	case growthbook.Warn:
		ev = log.Warn()
	case growthbook.Info:
		ev = log.Info()
	}

	// Add GrowthBook message label.
	ev.Str("message", msg.Message.Label())

	// Add all log detail fields, converting complex fields to JSONified
	// strings.
	ev.Fields(map[string]interface{}(msg.Data.FixJSONArgs()))

	// Write full log message as a string.
	ev.Msg(msg.String())
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
