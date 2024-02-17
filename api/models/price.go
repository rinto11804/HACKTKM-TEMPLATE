package models

type Price struct {
	ID        string `gorm:"primaryKey"`
	ProductID string
	Data      string
}
