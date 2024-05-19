class UpdateInventoryUseCase:
    def __init__(self, inventory_repo):
        self.inventory_repo = inventory_repo

    def execute(self, order):
        for item in order['items']:
            self.inventory_repo.decrease_stock(item['product_id'], item['quantity'])