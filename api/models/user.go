package models

type User struct {
	ID         string `gorm:"primaryKey" json:"id"`
	Email      string `gorm:"unique" json:"email"`
	Name       string `json:"name"`
	ProfilePic string `json:"profile_pic"`
	Role       string `json:"role"`
}
