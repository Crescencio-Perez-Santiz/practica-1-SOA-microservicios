import { Request, Response } from "express";
import { CreateOrder } from "../../application/usecases/CreateOrderUseCase";
import { Order } from "../../domain/Entities/Order";
import { OrderRepository } from "../repositories/OrderRepository";

export class CreateOrderController {
    private createOrderUseCase: CreateOrder;

    constructor(private repository: OrderRepository) {
        this.createOrderUseCase = new CreateOrder(repository);
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { total, Status } = req.body;
            const orderData = new Order(total, Status); // Se crea un nuevo pedido con la fecha actual
            const [success, result] = await this.createOrderUseCase.execute(
                orderData
            );

            if (success) {
                res.status(201).json({
                    message: "Order created",
                    data: result,
                });
            } else {
                res.status(400).json({
                    message: "Failed to create order",
                    error: result,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    }
}
