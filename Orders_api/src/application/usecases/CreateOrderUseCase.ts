import { Order as OrderDomain } from "../../domain/Entities/Order";

export class CreateOrder {
    private repository: any;
    private validStatuses: string[] = ["Pagado", "Creado", "Enviado"];

    constructor(repository: any) {
        this.repository = repository;
    }

    async execute(
        order: OrderDomain
    ): Promise<[boolean, OrderDomain | { error: string }]> {
        if (!this.validStatuses.includes(order.Status)) {
            return [false, { error: "Invalid status" }];
        }

        try {
            await this.repository.save(order);
            return [true, order];
        } catch (e: any) {
            return [false, { error: e.message }];
        }
    }
}
