package main

import (
	"github.com/growthbook/growthbook-golang"
)

// Some user attributes we can look up by name.

type userMap map[string]growthbook.Attributes

var users userMap = userMap{
	"eric": growthbook.Attributes{
		"id":                  "user-employee-234567890",
		"loggedIn":            true,
		"employee":            true,
		"country":             "france",
		"dietaryRestrictions": []interface{}{"gluten_free"},
	},
	"elke": growthbook.Attributes{
		"id":                  "user-employee-345678901",
		"loggedIn":            true,
		"employee":            true,
		"country":             "norway",
		"dietaryRestrictions": []interface{}{"vegan"},
	},
	"xiaofeng": growthbook.Attributes{
		"id":                  "user-employee-456789012",
		"loggedIn":            true,
		"employee":            false,
		"country":             "us",
		"dietaryRestrictions": []interface{}{},
	},
	"luisa": growthbook.Attributes{
		"id":                  "user-employee-567890123",
		"loggedIn":            true,
		"employee":            true,
		"country":             "spain",
		"dietaryRestrictions": []interface{}{},
	},
	"": growthbook.Attributes{
		"id":                  "unknown",
		"loggedIn":            false,
		"employee":            false,
		"country":             "unknown",
		"dietaryRestrictions": []interface{}{},
	},
}
