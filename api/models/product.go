package models

type Product struct {
	ID                string `gorm:"primaryKey"`
	Name              string
	Description       string
	ImageURL          string
	TotalEnruteDemand int
	TotalDemand       int
}
