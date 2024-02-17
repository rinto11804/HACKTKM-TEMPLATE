package repository

import (
	"github.com/akhil-is-watching/enrut_backend_api/helpers"
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type AssetRepository struct {
	db *gorm.DB
}

func NewAssetRepository(db *gorm.DB) AssetRepository {
	return AssetRepository{
		db: db,
	}
}

func (repo AssetRepository) Create(input types.AssetCreateInput) error {
	assetID := helpers.UIDGen().GenerateID("A")
	asset := models.Asset{
		ID:               assetID,
		AssetType:        input.AssetType,
		ProductionAmount: input.ProductionAmount,
		ProducerID:       input.ProducerID,
	}

	if err := repo.db.Save(&asset).Error; err != nil {
		return err
	}

	if len(input.IncomingAssets) > 0 {
		for _, i := range input.IncomingAssets {
			incoming := models.IncomingAsset{
				ID:            helpers.UIDGen().GenerateID("IA"),
				AssetID:       i.AssetID,
				OriginAssetID: asset.ID,
				Quantity:      i.Quantity,
			}

			if err := repo.db.Create(&incoming).Error; err != nil {
				return err
			}
		}
	}

	return nil
}

func (repo AssetRepository) All() ([]models.Asset, error) {
	var assets []models.Asset

	repo.db.Find(&assets)

	return assets, nil
}

func (repo AssetRepository) GetAssetsForUser(ProducerID string) ([]models.Asset, error) {
	var assets []models.Asset

	repo.db.Where("producer_id = ?", ProducerID).Find(&assets)

	return assets, nil
}
