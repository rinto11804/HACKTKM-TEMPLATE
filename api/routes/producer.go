package routes

import (
	"github.com/akhil-is-watching/enrut_backend_api/controllers"
	"github.com/gofiber/fiber/v2"
)

func ProducerRoutes(app *fiber.App) {
	app.Get("/producer/:producerId", controllers.GetProducer)
	app.Post("/producer", controllers.CreateProducer)
	app.Post("/login", controllers.LoginProducer)
}
