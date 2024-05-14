from abc import ABC, abstractmethod
from Domain.Entity.Products import Products

class ProductsInterface(ABC):
        
        @abstractmethod
        def get_products(self) -> list[Products]:
            pass
        
        @abstractmethod
        def add_product(self, product: Products) -> Products:
            pass