package routes

import (
	"github.com/akhil-is-watching/enrut_backend_api/controllers"
	"github.com/gofiber/fiber/v2"
)

func ProductRoutes(app *fiber.App) {
	app.Get("/product", controllers.AllProducts)
	app.Get("/product/:id", controllers.GetProduct)
	app.Post("/product", controllers.CreateProduct)
}
