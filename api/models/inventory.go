package models

type Inventory struct {
	ID        string `gorm:"primaryKey" json:"id"`
	UserID    string `json:"user_id"`
	ProductID string `json:"product_id"`
	Amount    int    `json:"amount"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}
