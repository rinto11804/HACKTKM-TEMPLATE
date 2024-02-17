package repository

import (
	"github.com/akhil-is-watching/enrut_backend_api/helpers"
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return ProductRepository{
		db: db,
	}
}

func (repo ProductRepository) Create(input types.ProductCreateInput) error {
	product := models.Product{
		ID:                helpers.UIDGen().GenerateID("P"),
		Name:              input.Name,
		Description:       input.Description,
		ImageURL:          input.ImageURL,
		TotalDemand:       0,
		TotalEnruteDemand: 0,
	}

	if err := repo.db.Create(&product).Error; err != nil {
		return err
	}

	return nil

}

func (repo ProductRepository) GetByID(ID string) (types.ProductResult, error) {
	var product models.Product

	if err := repo.db.Where("id = ?", ID).First(&product).Error; err != nil {
		return types.ProductResult{}, err
	}

	result := types.ProductResult{
		ID:                product.ID,
		Name:              product.Name,
		Description:       product.Description,
		ImageURL:          product.ImageURL,
		TotalDemand:       product.TotalDemand,
		TotalEnruteDemand: product.TotalEnruteDemand,
	}

	return result, nil
}

func (repo ProductRepository) All() ([]types.ProductResult, error) {
	var products []models.Product
	var results []types.ProductResult

	results = []types.ProductResult{}
	if err := repo.db.Find(&products).Error; err != nil {
		return []types.ProductResult{}, err
	}

	for _, product := range products {
		result := types.ProductResult{
			ID:                product.ID,
			Name:              product.Name,
			Description:       product.Description,
			ImageURL:          product.ImageURL,
			TotalDemand:       product.TotalDemand,
			TotalEnruteDemand: product.TotalEnruteDemand,
		}

		results = append(results, result)
	}

	return results, nil
}
