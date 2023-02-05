package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	
	Name				string				`gorm:"uniqeIndex"`
	Email			string				`gorm:"uniqeIndex"`
	Tel				string				`gorm:"uniqeIndex"`
	Password			string
	Role				string			


}

type Room struct {
	gorm.Model
	
	Username			string				`gorm:"uniqeIndex"`
	Useremail			string				`gorm:"uniqeIndex"`
	Usertel			string				`gorm:"uniqeIndex"`
	Userrole			string			
	


}


