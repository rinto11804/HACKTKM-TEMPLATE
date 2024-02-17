package routes

import (
	"github.com/akhil-is-watching/enrut_backend_api/controllers"
	"github.com/gofiber/fiber/v2"
)

func AssetRoutes(app *fiber.App) {
	app.Get("/asset", controllers.AllAssets)
	app.Get("/asset/:producerId", controllers.GetForUser)
	app.Post("/asset", controllers.CreateAsset)
}
