package main

import (
	"fmt"
	"net/http"
)

func main() {
	server := http.NewServeMux()

	server.Handle("/acme", http.HandlerFunc(acmeHandler))

	fmt.Println("Server running at http://localhost:8070")

	http.ListenAndServe(":8070", server)
}
