package entity

import (
	//"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("GPIO.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&User{},
	)

	db = database


	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Firstname:     	"Jakkrit",
		Lastname:     	"Chaiwan",
		Email:   		"jackerchaiwan@gmail.com",
		Tel:   			"0610255279",
		Room: 			"Admin",
		Password: 		string(password),
		Role:			"admin",
		Path: 			"admin",
	})

	db.Model(&User{}).Create(&User{
		Firstname:     	"User",
		Lastname:     	"01",
		Email:   		"user01@gmail.com",
		Tel:   			"0951677644",
		Room: 			"A11",
		Password: 		string(password),
		Role:     		"user",
		Path: 			"11",	
	})

	var jakkrit	User
	db.Raw("SELECT * FROM users WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)

	var user01  	User
	db.Raw("SELECT * FROM users WHERE email = ?", "user01@gmail.com").Scan(&user01)


}