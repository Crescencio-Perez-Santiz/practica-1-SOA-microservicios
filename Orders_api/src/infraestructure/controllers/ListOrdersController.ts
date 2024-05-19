import { Request, Response } from "express";
import { listAllOrders } from "../../application/usecases/ListOrdersUseCase";
import { OrderRepository } from "../repositories/OrderRepository";

export class ListOrdersController {
    private listOrdersUseCase: listAllOrders;

    constructor(private repository: OrderRepository) {
        this.listOrdersUseCase = new listAllOrders(repository);
    }

    async listAll(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.listOrdersUseCase.execute();
            res.status(200).json({
                message: "List of orders",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    }
}
