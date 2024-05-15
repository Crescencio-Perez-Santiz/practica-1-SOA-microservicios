import { Order } from '../models/Order';

export interface OrderService {
  createOrder(total: number, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order>;
  listOrders(): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order | null>;
}
