package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	log.SetFlags(log.Lshortfile)

	// static files
	http.Handle("/", http.FileServer(http.Dir("web/public")))

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	fmt.Println("listening on port " + port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
