package main

import (
	"fmt"
	"net/http"
)

func main() {
	server := http.NewServeMux()

	server.Handle("/acme", http.HandlerFunc(acmeHandler))

	fmt.Println("Acme endpoint: http://localhost:8070/acme")

	http.ListenAndServe(":8070", server)
}
