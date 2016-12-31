package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/danielkermode/marbletrader/web/server/db"
)

func serveSingle(pattern string, filename string) {
	http.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	})
}

func main() {
	log.SetFlags(log.Lshortfile)

	serveSingle("/", "/client/build/index.html")
	serveSingle("/favicon.ico", "/client/build/favicon.ico")
	http.HandleFunc("/login", HandleLogin)
	http.HandleFunc("/profile", HandleProfile)

	// static files
	// http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("/public/assets"))))

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	db.Init()

	fmt.Println("listening on port " + port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
