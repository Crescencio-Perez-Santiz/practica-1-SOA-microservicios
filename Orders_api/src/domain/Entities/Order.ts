import { v4 as uuidv4 } from "uuid";
export class Order {
    order_uuid: string;
    total: number;
    date: Date;
    Status: "Pagado" | "Creado" | "Enviado";

    constructor(total: number, Status: "Pagado" | "Creado" | "Enviado") {
        this.order_uuid = uuidv4();
        this.total = total;
        this.date = new Date();
        this.Status = Status;
    }
    to_dict(): Record<string, any> {
        return {
            order_uuid: this.order_uuid,
            total: this.total,
            date: this.date,
            Status: this.Status,
        };
    }
}
