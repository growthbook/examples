package main

import (
	"encoding/json"
	"time"
)

// GBFeaturesResponse
// GrowthBook features response
type GBFeaturesResponse struct {
	Status            int             `json:"status"`
	Features          json.RawMessage `json:"features"`
	EncryptedFeatures string          `json:"encryptedFeatures,omitempty"` // Not supported in the Go SDK
	DateUpdated       time.Time       `json:"dateUpdated"`
}
