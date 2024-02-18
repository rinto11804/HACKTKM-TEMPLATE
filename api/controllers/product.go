package controllers

import (
	"github.com/akhil-is-watching/enrut_backend_api/repository"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"github.com/gofiber/fiber/v2"
)

func CreateProduct(c *fiber.Ctx) error {
	var input types.ProductCreateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	productRepo := repository.NewProductRepository(storage.GetDB())
	if err := productRepo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "Product Created Successfully",
	})
}

func GetProduct(c *fiber.Ctx) error {

	ID := c.Params("id")

	productRepo := repository.NewProductRepository(storage.GetDB())
	product, err := productRepo.GetByID(ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  product,
	})
}

func AllProducts(c *fiber.Ctx) error {

	productRepo := repository.NewProductRepository(storage.GetDB())
	products, err := productRepo.All()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  products,
	})
}
