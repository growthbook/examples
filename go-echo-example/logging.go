package main

import (
	"github.com/growthbook/growthbook-golang"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sirupsen/logrus"
)

// Initialise logging using Logrus for both Echo and GrowthBook
// output.

func initLogging(e *echo.Echo) {
	// Set up Logrus for Echo.
	log := logrus.New()
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, values middleware.RequestLoggerValues) error {
			log.WithFields(logrus.Fields{
				"URI":    values.URI,
				"status": values.Status,
			}).Info("request")
			return nil
		},
	}))

	// Wire up GrowthBook log output to Logrus.
	growthbook.SetLogger(&logger{log})
}

// Wrapper around Logrus logger to use for routing GrowthBook log
// messages.

type logger struct{ *logrus.Logger }

// Write a GrowthBook log message to Logrus in a simple way.

func (log *logger) Handle(msg *growthbook.LogMessage) {
	// Add all log detail fields, converting complex fields to JSONified
	// strings.
	entry := log.WithFields(logrus.Fields(msg.Data.FixJSONArgs()))

	// Add GrowthBook message label.
	entry = entry.WithField("label", msg.Message.Label())

	// Write full log message as a string.
	entry = entry.WithField("message", msg.String())

	// Convert log level.
	switch msg.Level {
	case growthbook.Error:
		entry.Error()
	case growthbook.Warn:
		entry.Warn()
	case growthbook.Info:
		entry.Info()
	}
}
