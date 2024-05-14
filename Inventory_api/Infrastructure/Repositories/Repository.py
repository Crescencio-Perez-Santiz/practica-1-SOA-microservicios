from Database.Connection import DBConnection, Base
from sqlalchemy import Column, Integer, String, Float
from Domain.Entity.Products import Products
from Domain.Port.ProductsInterface import ProductsInterface

class Inventory(Base):
    __tablename__ = 'inventory'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    price = Column(Float)
    stock = Column(Integer)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "stock": self.stock
        }
    
class InventoryRepository(ProductsInterface):
    def __init__(self):
        self.session = DBConnection().get_session()
    
    def get_products(self):
        products = self.session.query(Inventory).all()
        return products
        
    def add_product(self, product: Products):
        product = Inventory(name=product.name, price=product.price, stock=product.stock)
        self.session.add(product)
        self.session.commit()
        return product