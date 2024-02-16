package models

type OutgoingAsset struct {
	ID            string `gorm:"primaryKey"`
	AssetID       string
	OriginAssetID string
	Quantity      int
}
