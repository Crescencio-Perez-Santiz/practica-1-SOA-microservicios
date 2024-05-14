from flask import Flask
from Infrastructure.Routes.Router import initialize_routes
from Infrastructure.Repositories.Repository import InventoryRepository

app = Flask(__name__)
inventory_repository= InventoryRepository()

initialize_routes(app, inventory_repository)

if __name__ == '__main__':
    app.run(debug=True, port='3001')