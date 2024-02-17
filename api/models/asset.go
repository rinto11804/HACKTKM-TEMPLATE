package models

type Asset struct {
	ID               string `gorm:"primaryKey"`
	AssetType        string
	ProductionAmount int
	IncomingAssets   []IncomingAsset
	OutgoingAssets   []OutgoingAsset
	ProducerID       string
}
