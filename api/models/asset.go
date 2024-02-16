package models

type Asset struct {
	AssetID          string `gorm:"primaryKey"`
	AssetType        string
	ProductionAmount string
	IncomingAssets   []IncomingAsset
	OutgoingAssets   []OutgoingAsset
	ProducerID       string
}
