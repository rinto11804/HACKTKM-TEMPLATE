package repository

import (
	"github.com/akhil-is-watching/enrut_backend_api/helpers"
	"github.com/akhil-is-watching/enrut_backend_api/models"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return UserRepository{
		db: db,
	}
}

func (repo UserRepository) Create(input types.UserCreateInput) error {
	user := models.User{
		ID:         helpers.UIDGen().GenerateID("U"),
		Email:      input.Email,
		Name:       input.Name,
		ProfilePic: input.ProfilePic,
		Role:       input.Role,
	}

	if err := repo.db.Create(&user).Error; err != nil {
		return err
	}

	return nil
}

func (repo UserRepository) GetByEmail(input types.UserLoginInput) (models.User, error) {
	var user models.User

	if err := repo.db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (repo UserRepository) GetByID(UserID string) (models.User, error) {
	var user models.User

	if err := repo.db.Where("id = ?", UserID).First(&user).Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}
