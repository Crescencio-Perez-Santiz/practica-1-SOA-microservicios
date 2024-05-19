import { getRepository } from "typeorm";
import { OrderModel } from "../../database/db";
import { Order as OrderDomain } from "../../domain/Entities/Order";

export class OrderRepository {
    private orderRepository = getRepository(OrderModel);

    async save(order: OrderDomain): Promise<OrderModel> {
        const newOrder = this.orderRepository.create({
            order_uuid: order.order_uuid,
            total: order.total,
            status: order.Status,
            date: order.date,
        });
        return await this.orderRepository.save(newOrder);
    }

    async listAll(): Promise<OrderModel[]> {
        return await this.orderRepository.find();
    }

    async findById(id: number): Promise<OrderModel | undefined> {
        const order = await this.orderRepository.findOne({ where: { id } });
        return order || undefined;
    }

    async UpdateOrderStatus(
        id: number,
        status: string
    ): Promise<OrderModel | undefined> {
        const order = await this.findById(id);
        if (order) {
            order.status = status;
            await this.orderRepository.save(order);
        }
        return order || undefined;
    }
}
