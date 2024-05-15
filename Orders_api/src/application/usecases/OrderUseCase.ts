import { OrderService } from '../../domain/services/OrderService';
import { Order } from '../../domain/models/Order';

export class OrderUseCase {
  constructor(private orderService: OrderService) { }

  async createOrder(total: number, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order> {
    try {
      const order = await this.orderService.createOrder(total, status);
      return order;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating order');
    }
  }


  async listOrders(): Promise<Order[]> {
    return this.orderService.listOrders();
  }

  async updateOrderStatus(orderId: string, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order | null> {
    return this.orderService.updateOrderStatus(orderId, status);
  }
}