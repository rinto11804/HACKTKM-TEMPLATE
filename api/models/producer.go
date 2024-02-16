package models

type Producer struct {
	ID     string `gorm:"primaryKey"`
	Name   string
	Email  string
	Assets []Asset
}
