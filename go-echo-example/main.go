package main

import (
	"fmt"

	"github.com/growthbook/growthbook-golang"
	"github.com/labstack/echo/v4"
	slogecho "github.com/samber/slog-echo"
	"golang.org/x/exp/slog"
)

func main() {
	e := echo.New()

	// Initialize logging: this shows how to route both GrowthBook and
	// Echo log messages to slog.
	e.Use(slogecho.New(slog.Default()))
	growthbook.SetLogger(slog.Default())

	// Create experiment tracker and (tiny!) tracking cache. (The small
	// size allows us to observe cache evictions and calls to the
	// experiment tracker: just request the experiment endpoint for a
	// range of different users to see what happens.)
	track := newTrackingCache(3, &tracker{})

	// Create a GrowthBook client instance with settings to allow for
	// retrieving features from the GrowthBook API.
	gb := growthbook.NewClient(&growthbook.Options{
		ClientKey:         "sdk-JA5F3MFuaIBB4z",
		ExperimentTracker: track,
	})

	// Add custom middleware to inject GrowthBook instance and user
	// attributes into Echo context for request handlers.
	e.Use(customMiddleware(gb))

	// Load features from GrowthBook API with automatic updating.
	err := gb.LoadFeatures(&growthbook.FeatureRepoOptions{AutoRefresh: true})
	if err != nil {
		panic(err)
	}

	// Set up handlers.
	e.GET("/greeting", greetingHandler)
	e.GET("/dark_mode", darkModeHandler)
	e.GET("/meal_overrides", mealOverridesHandler)
	e.GET("/experiment", experimentHandler)
	e.GET("/acme", acmeHandler)

	// Off we go...
	fmt.Println(instructions)
	fmt.Println()
	fmt.Println("---- Echo log messages start here ----")
	e.Logger.Fatal(e.Start(":8070"))
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