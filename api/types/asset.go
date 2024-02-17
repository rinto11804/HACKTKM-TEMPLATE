package types

type AssetCreateInput struct {
	AssetType        string               `json:"asset_type"`
	ProductionAmount int                  `json:"production_amount"`
	ProducerID       string               `json:"producer_id"`
	IncomingAssets   []IncomingAssetInput `json:"incoming_assets"`
}

type IncomingAssetInput struct {
	AssetID  string `json:"asset_id"`
	Quantity int    `json:"quantity"`
}
