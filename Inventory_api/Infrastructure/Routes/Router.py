from Infrastructure.Controllers.CreateProductController import create_product_blueprint, initialize_endpoints as initialize_create_product
from Infrastructure.Controllers.GetInventoryController import get_inventory_blueprint, initialize_endpoints as initialize_get_inventory
from Infrastructure.Controllers.DeleteProductController import delete_product_blueprint, initialize_endpoints as initialize_delete_product
def initialize_routes(app, product_repository):
    initialize_create_product(product_repository)
    initialize_get_inventory(product_repository)
    initialize_delete_product(product_repository)
    
    app.register_blueprint(create_product_blueprint)
    app.register_blueprint(get_inventory_blueprint)
    app.register_blueprint(delete_product_blueprint)