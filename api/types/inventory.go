package types

type InventoryCreateInput struct {
	UserID    string `json:"user_id"`
	ProductID string `json:"product_id"`
	Amount    int    `json:"amount"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

type InventoryUpdateInput struct {
	ID     string `json:"id"`
	Amount int    `json:"amount"`
}

type InventoryResult struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	ProductID string `json:"product_id"`
	Amount    int    `json:"amount"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}
