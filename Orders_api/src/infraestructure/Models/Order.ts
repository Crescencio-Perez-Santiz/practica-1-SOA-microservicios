// En OrderModel.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class OrderModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  total!: number;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @Column('date')
  date!: Date;

  toDict(): Record<string, any> {
    return {
      id: this.id,
      total: this.total,
      status: this.status,
      date: this.date,
    }
  }
}

export default OrderModel;