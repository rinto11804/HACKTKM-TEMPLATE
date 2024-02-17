package routes

import (
	"github.com/akhil-is-watching/enrut_backend_api/controllers"
	"github.com/gofiber/fiber/v2"
)

func InventoryRoutes(app *fiber.App) {
	app.Get("/inventory/:id", controllers.GetUserInventory)
	app.Post("/inventory", controllers.CreateInventory)
	app.Patch("/inventory", controllers.UpdateInventory)
}
