package routes

import (
	"github.com/akhil-is-watching/enrut_backend_api/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Get("/user/:id", controllers.GetUser)
	app.Post("/user/register", controllers.CreateFarmer)
	app.Post("/user/login", controllers.LoginFarmer)
}
