package models

import (
	"github.com/danielkermode/marbletrader/web/server/db"
	"github.com/golang/glog"
)

type User struct {
	Id    int64 `db:"UserId"`
	Email string
}

func InsertUser(email string) error {
	_, err := db.DB.Exec("INSERT INTO Users (email) VALUES ($1)", email)
	return err
}

func GetUserByEmail(email string) (user *User) {
	rows, err := db.DB.Query("SELECT * FROM Users where Email = $1", email)

	if err != nil {
		glog.Warningf("Can't get user by email: %v", err)
	}
	return
}
