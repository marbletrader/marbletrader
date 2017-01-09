package models

import "github.com/danielkermode/marbletrader/web/server/db"

// User ...
type User struct {
	ID    int64 `db:"UserId"`
	Email string
}

// InsertUser ...
func InsertUser(email string) error {
	_, err := db.DB.Exec("INSERT INTO Users (email) VALUES ($1)", email)
	return err
}

// func GetUserByEmail(email string) (user *User) {
// 	rows, err := db.DB.Query("SELECT * FROM Users where Email = $1", email)
//
// 	if err != nil {
// 		glog.Warningf("Can't get user by email: %v", err)
// 	}
// 	return
// }

// InsertUserIfNotExists ...
func InsertUserIfNotExists(email string) error {
	query := "INSERT INTO Users (email) SELECT '$1' WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email='$1')"
	_, err := db.DB.Exec(query, email)

	return err

}
