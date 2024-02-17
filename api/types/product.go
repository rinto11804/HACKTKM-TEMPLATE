package types

type ProductCreateInput struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
}

type ProductResult struct {
	ID                string `json:"id"`
	Name              string `json:"name"`
	Description       string `json:"description"`
	ImageURL          string `json:"image_url"`
	TotalEnruteDemand int    `json:"total_enrute_demand"`
	TotalDemand       int    `json:"total_demand"`
}
