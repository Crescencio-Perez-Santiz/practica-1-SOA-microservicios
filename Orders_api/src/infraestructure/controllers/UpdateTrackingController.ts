import { Request, Response } from "express";
import { UpdateOrderStatusUseCase } from "../../application/usecases/UpdateTrackingUseCase";
import { OrderRepository } from "../repositories/OrderRepository";

export class UpdateOrderStatusController {
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase;

    constructor(private repository: OrderRepository) {
        this.updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
            repository
        );
    }

    async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const updatedOrder = await this.updateOrderStatusUseCase.execute(
                id,
                status
            );
            if (updatedOrder) {
                res.status(200).json({
                    message: "Order status updated",
                    data: updatedOrder,
                });
            } else {
                res.status(404).json({
                    message: "Order not found",
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
