package models

type IncomingAsset struct {
	ID            string `gorm:"primaryKey"`
	AssetID       string
	OriginAssetID string
	Quantity      int
}
