package repository

import (
	"github.com/akhil-is-watching/enrut_backend_api/helpers"
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type InventoryRepository struct {
	db *gorm.DB
}

func NewInventoryRepository(db *gorm.DB) InventoryRepository {
	return InventoryRepository{
		db: db,
	}
}

func (repo InventoryRepository) Create(input types.InventoryCreateInput) error {
	inventory := models.Inventory{
		ID:        helpers.UIDGen().GenerateID("I"),
		UserID:    input.UserID,
		ProductID: input.ProductID,
		Amount:    input.Amount,
		Latitude:  input.Latitude,
		Longitude: input.Longitude,
	}

	if err := repo.db.Create(&inventory).Error; err != nil {
		return err
	}

	return nil
}

func (repo InventoryRepository) UpdateInventory(input types.InventoryUpdateInput) error {
	var inventory models.Inventory

	if err := repo.db.Where("id = ?", input.ID).First(&inventory).Error; err != nil {
		return err
	}

	inventory.Amount = input.Amount
	if err := repo.db.Save(&inventory).Error; err != nil {
		return err
	}

	return nil
}

func (repo InventoryRepository) GetUserInventory(UserID string) ([]models.Inventory, error) {
	var inventories []models.Inventory

	if err := repo.db.Where("user_id = ?", UserID).Find(&inventories).Error; err != nil {
		return inventories, err
	}

	return inventories, nil
}
