from Infrastructure.Controllers.CreateProductController import create_product_blueprint, initialize_endpoints as initialize_create_product

def initialize_routes(app, product_repository):
    initialize_create_product(product_repository)
    app.register_blueprint(create_product_blueprint)