package main

import (
	"log"

	"github.com/akhil-is-watching/enrut_backend_api/config"
	"github.com/akhil-is-watching/enrut_backend_api/routes"
	"github.com/akhil-is-watching/enrut_backend_api/storage"
	"github.com/gofiber/fiber/v2"
)

func init() {
	config, err := config.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	storage.ConnectDB(&config)
}

func main() {
	app := fiber.New()
	routes.InitRoutes(app)
	app.Listen(":3000")
}
