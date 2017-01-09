package db

import (
	"database/sql"
	"fmt"
	"log"
	// driver
	_ "github.com/lib/pq"
)

// DB pointer to database
var DB *sql.DB

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

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS Users(id SERIAL, email varchar(32))")

	if err != nil {
		log.Fatal(err)
	}
	// assign database to pointer
	DB = db

	fmt.Println("db connection ok")
}
