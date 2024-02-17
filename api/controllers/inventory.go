package controllers

import (
	"github.com/akhil-is-watching/enrut_backend_api/repository"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"github.com/gofiber/fiber/v2"
)

func CreateInventory(c *fiber.Ctx) error {
	var input types.InventoryCreateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	inventoryRepo := repository.NewInventoryRepository(storage.GetDB())
	if err := inventoryRepo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "Inventory Created Successfully",
	})
}

func UpdateInventory(c *fiber.Ctx) error {
	var input types.InventoryUpdateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	inventoryRepo := repository.NewInventoryRepository(storage.GetDB())
	if err := inventoryRepo.UpdateInventory(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "Inventory Updated Successfully",
	})
}

func GetUserInventory(c *fiber.Ctx) error {
	UserID := c.Params("id")

	inventoryRepo := repository.NewInventoryRepository(storage.GetDB())
	inventories, err := inventoryRepo.GetUserInventory(UserID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  inventories,
	})
}
