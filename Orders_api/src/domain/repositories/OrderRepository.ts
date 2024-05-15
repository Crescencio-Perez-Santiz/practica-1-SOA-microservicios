import { Order } from '../models/Order';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  updateStatus(orderId: string, status: string): Promise<Order | null>;
}
