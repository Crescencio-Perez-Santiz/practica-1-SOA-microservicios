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
            return updatedOrder;
        } catch (error) {
            throw new Error(
                `Error al actualizar el estado de la orden: ${error}`
            );
        }
    }
}
