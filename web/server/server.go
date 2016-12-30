package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/danielkermode/marbletrader/web/server/db"
	"github.com/gorilla/mux"
)

var router = mux.NewRouter()

func serveSingle(pattern string, filename string) {
	http.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	})
}

func main() {
	log.SetFlags(log.Lshortfile)
	http.Handle("/portal/", router)
	serveSingle("/", "/public/index.html")
	serveSingle("/favicon.ico", "/public/favicon.ico")
	serveSingle("/login", "/public/login.html")

	// static files
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("/public/assets"))))

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	db.Init()

	fmt.Println("listening on port " + port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
