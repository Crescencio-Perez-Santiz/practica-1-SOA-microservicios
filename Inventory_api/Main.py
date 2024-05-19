from flask import Flask
from Infrastructure.Routes.Router import initialize_routes
from Infrastructure.Repositories.Repository import InventoryRepository
from Consumer.EventConsumer import start_consumer
import threading

app = Flask(__name__)
inventory_repository = InventoryRepository()

initialize_routes(app, inventory_repository)

if __name__ == '__main__':
    consumer_thread = threading.Thread(target=start_consumer)
    consumer_thread.start()
    app.run(debug=True, port='3001')