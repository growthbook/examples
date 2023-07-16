package main

import (
	"github.com/growthbook/growthbook-golang"
	"github.com/labstack/echo/v4"
)

// Custom request context including GrowthBook client instance and
// user attributes injected by examining query parameters.

type CustomContext struct {
	echo.Context
	GB         *growthbook.Client
	Attributes growthbook.Attributes
	User       string
}

// Custom middleware to look up user based on query parameter and pass
// a context to the next handler that includes the user attributes and
// the GrowthBook client instance.
//
// (A real implementation of this sort of thing would inject
// attributes based on authentication credentials. The simple map
// lookup based on a query parameter here is just intended as a
// demonstration!)

func customMiddleware(gb *growthbook.Client) func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			user := c.QueryParam("user")
			return next(&CustomContext{c, gb, users[user], user})
		}
	}
}
