import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Order_ProductsModel } from "./Order_Products";

@Entity("orders")
export class OrderModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 36, unique: true })
    order_uuid!: string;

    @Column("float")
    total!: number;

    @Column({ type: "varchar", length: 50 })
    status!: string;

    @Column("date")
    date!: Date;

    @OneToOne(
        () => Order_ProductsModel,
        (order_products) => order_products.order
    )
    order_products!: Order_ProductsModel;

    toDict(): Record<string, any> {
        return {
            id: this.id,
            order_uuid: this.order_uuid,
            total: this.total,
            status: this.status,
            date: this.date,
            order_products: this.order_products.toDict(),
        };
    }
}

export default OrderModel;
