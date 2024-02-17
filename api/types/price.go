package types

type PriceCreateInput struct {
	ProductID string `json:"product_id"`
	Data      string `json:"data"`
}

type PriceResult struct {
	District string      `json:"district"`
	Data     []PriceData `json:"data"`
}

type PriceData struct {
	Date  string `json:"date"`
	Price string `json:"price"`
}
