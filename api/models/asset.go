package models

type Asset struct {
	ID               string `gorm:"primaryKey"`
	AssetType        string
	ProductionAmount int
	ProducerID       string
}
