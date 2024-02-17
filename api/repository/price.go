package repository

import (
	"encoding/json"

	"github.com/akhil-is-watching/enrut_backend_api/helpers"
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type PriceRepository struct {
	db *gorm.DB
}

func NewPriceRepository(db *gorm.DB) PriceRepository {
	return PriceRepository{
		db: db,
	}
}

func (repo PriceRepository) Create(input types.PriceCreateInput) error {
	price := models.Price{
		ID:        helpers.UIDGen().GenerateID("P"),
		ProductID: input.ProductID,
		Data:      input.Data,
	}

	if err := repo.db.Create(&price).Error; err != nil {
		return err
	}

	return nil
}

func (repo PriceRepository) Get(ProductID string) ([]types.PriceResult, error) {
	var price models.Price
	var result []types.PriceResult

	if err := repo.db.Where("product_id = ?", ProductID).First(&price).Error; err != nil {
		return []types.PriceResult{}, err
	}

	if err := json.Unmarshal([]byte(price.Data), &result); err != nil {
		return []types.PriceResult{}, err
	}

	return result, nil
}
