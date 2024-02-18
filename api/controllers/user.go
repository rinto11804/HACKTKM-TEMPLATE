package controllers

import (
	"github.com/akhil-is-watching/enrut_backend_api/repository"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"github.com/gofiber/fiber/v2"
)

func CreateFarmer(c *fiber.Ctx) error {
	var input types.UserCreateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	userRepo := repository.NewUserRepository(storage.GetDB())
	if err := userRepo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "User Created Successfully",
	})
}

func LoginFarmer(c *fiber.Ctx) error {
	var input types.UserLoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}
	userRepo := repository.NewUserRepository(storage.GetDB())
	user, err := userRepo.GetByEmail(input)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  user,
	})
}

func GetUser(c *fiber.Ctx) error {
	UserID := c.Params("id")

	userRepo := repository.NewUserRepository(storage.GetDB())
	user, err := userRepo.GetByID(UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  user,
	})
}
