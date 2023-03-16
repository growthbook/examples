package main

import (
	"net/http"
)

func main() {
	server := http.NewServeMux()

	server.Handle("/acme", http.HandlerFunc(acmeHandler))

	http.ListenAndServe(":8070", server)
}
