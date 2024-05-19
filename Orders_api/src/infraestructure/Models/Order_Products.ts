import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { OrderModel } from "./Order";

@Entity("order_products")
export class Order_ProductsModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    product_id!: number;

    @Column("int")
    quantity!: number;

    @OneToOne(() => OrderModel)
    @JoinColumn()
    order!: OrderModel;

    toDict(): Record<string, any> {
        return {
            id: this.id,
            product_id: this.product_id,
            quantity: this.quantity,
            order: this.order.toDict(),
        };
    }
}
