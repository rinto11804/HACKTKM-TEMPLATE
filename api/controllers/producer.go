package controllers

import (
	"github.com/akhil-is-watching/enrut_backend_api/repository"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/akhil-is-watching/enrut_backend_api/types"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func LoginProducer(c *fiber.Ctx) error {
	var input types.ProducerLoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	producerRepo := repository.NewProducerRepository(storage.GetDB())
	producer, err := producerRepo.GetByEmail(input)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(producer.Password), []byte(input.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "success",
	})
}

func CreateProducer(c *fiber.Ctx) error {
	var input types.ProducerCreateInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	producerRepo := repository.NewProducerRepository(storage.GetDB())
	if err := producerRepo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  "Producer created successfully",
	})
}

func GetProducer(c *fiber.Ctx) error {
	producerId := c.Params("producerId")

	producerRepo := repository.NewProducerRepository(storage.GetDB())
	producer, err := producerRepo.Get(types.ProducerByIDInput{ID: producerId})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"data":  err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"data":  producer,
	})
}
