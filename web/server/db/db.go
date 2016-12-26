package db

import (
	"database/sql"
	"log"
	// driver
	_ "github.com/lib/pq"
)

// Init ...
func Init() {
	db, err := sql.Open("postgres", "user=danker dbname=TotalRecall sslmode=disable")

	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()

	if err != nil {
		log.Fatal(err)
	}
}
