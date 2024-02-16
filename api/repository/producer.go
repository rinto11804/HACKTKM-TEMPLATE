package repository

import (
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type ProducerRepository struct {
	db *gorm.DB
}

func NewProducerRepository(db *gorm.DB) ProducerRepository {
	return ProducerRepository{
		db: db,
	}
}

func (repo ProducerRepository) Create(input types.ProducerCreateInput) error {
	producer := models.Producer{
		Name:  input.Name,
		Email: input.Email,
	}

	if err := repo.db.Create(&producer).Error; err != nil {
		return err
	}
	return nil
}

func (repo ProducerRepository) Get(input types.ProducerByIDInput) (types.ProducerResult, error) {
	var producer models.Producer
	if err := repo.db.Where("id = ?", input.ID).First(&producer).Error; err != nil {
		return types.ProducerResult{}, err
	}

	producerResult := types.ProducerResult{
		ID:    producer.ID.String(),
		Name:  producer.Name,
		Email: producer.Email,
	}

	return producerResult, nil
}
