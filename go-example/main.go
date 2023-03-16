package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Hello, world!")

	server := http.NewServeMux()

	server.Handle("/acme", http.HandlerFunc(acmeHandler))

	http.ListenAndServe(":8070", server)
}
