import { Order_ProductsModel } from "../../infraestructure/Models/Order_Products";
import { publishToQueue } from "../../Publisher/EventPublisher";

export class UpdateOrderStatusUseCase {
    private orderRepository: any;
    private validStatuses: string[] = ["Pagado", "Creado", "Enviado"];

    constructor(repository: any) {
        this.orderRepository = repository;
    }

    async execute(id: string, status: string) {
        if (!this.validStatuses.includes(status)) {
            throw new Error(`El estado ${status} no es válido.`);
        }

        try {
            const updatedOrder = await this.orderRepository.UpdateOrderStatus(
                id,
                status
            );
            if (status === "Enviado") {
                // Obtén los productos de la orden
                const order_products =
                    await this.orderRepository.getOrderProducts(id);
                const order = { items: order_products };
                publishToQueue("OrderShipped", order);
            }
            return updatedOrder;
        } catch (error) {
            throw new Error(
                `Error al actualizar el estado de la orden: ${error}`
            );
        }
    }
}
