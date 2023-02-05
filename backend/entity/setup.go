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
		&User{}, &Room{},
	)

	db = database


	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Name:     	"Jakkrit Chaiwan",
		Email:   		"jackerchaiwan@gmail.com",
		Tel:   		"0610255279",
		Password: 	string(password),
		Role:		"admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     	"User01",
		Email:   		"employee@gmail.com",
		Tel:   		"0951677644",
		Password: 	string(password),
		Role:     	"101",
	})

	var jakkrit	User
	db.Raw("SELECT * FROM users WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)

	var admin  	User
	db.Raw("SELECT * FROM users WHERE email = ?", "employee@gmail.com").Scan(&admin)


}