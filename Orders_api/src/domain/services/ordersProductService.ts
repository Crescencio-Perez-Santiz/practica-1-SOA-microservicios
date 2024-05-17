export interface OrderProductService {
    addProductToOrder(orderId: string, price: number, quantity: number): Promise<void>;
    getOrderProducts(orderId: string): Promise<any[]>;
}