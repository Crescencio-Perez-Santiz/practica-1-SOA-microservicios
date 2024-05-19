import { getRepository } from "typeorm";
import { OrderModel } from "../../database/db";
import { Order as OrderDomain } from "../../domain/Entities/Order";

export class OrderRepository {
  private orderRepository = getRepository(OrderModel);
  
  async save(order: OrderDomain): Promise<OrderModel> {
      const newOrder = this.orderRepository.create({
        total: order.total,
        status: order.Status,
        date: order.date,
      });
      return await this.orderRepository.save(newOrder);
  }
}