package main

import (
	"encoding/json"
	"net/http"
)

func acmeHandler(w http.ResponseWriter, r *http.Request) {
	data := map[string]any{
		"foo": 1,
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(data)
}
