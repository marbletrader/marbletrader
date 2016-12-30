package db

import (
	"database/sql"
	"fmt"
	"log"
	// driver
	_ "github.com/lib/pq"
)

// Init ...
func Init() {
	db, err := sql.Open("postgres", "user=marbletrader_dev password=password dbname=marbletrader_dev host=db sslmode=disable")

	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("db connection ok")
}
