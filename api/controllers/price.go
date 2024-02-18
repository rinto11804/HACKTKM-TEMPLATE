package controllers

import (
	"github.com/akhil-is-watching/enrut_backend_api/repository"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"github.com/gofiber/fiber/v2"
)

func CreatePrice(c *fiber.Ctx) error {
	var input types.PriceCreateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	priceRepo := repository.NewPriceRepository(storage.GetDB())
	if err := priceRepo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "Price created successfully",
	})
}

func GetPrice(c *fiber.Ctx) error {
	id := c.Params("id")

	priceRepo := repository.NewPriceRepository(storage.GetDB())
	data, err := priceRepo.Get(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  data,
	})
}
