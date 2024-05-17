import { Order } from '../../domain/models/Order';
import { OrderService } from '../../domain/services/OrderService';
import { OrderProductService } from '../../domain/services/ordersProductService';
import { dbConfig } from '../../database/db';
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

export class OrderRepositoryImpl implements OrderService, OrderProductService {
  private pool: Pool;

  constructor() {
    this.pool = createPool(dbConfig);
  }

  async createOrder(total: number, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order> {
    const connection = await this.pool.getConnection();
    try {
      const [result] = await connection.query('INSERT INTO orders (total, date, status) VALUES (?, ?, ?)', [total, new Date(), status]);
      const newOrderId = (result as any).insertId;
      return { id: newOrderId, total, status, date: new Date() };
    } finally {
      connection.release();
    }
  }

  async listOrders(): Promise<Order[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM orders');
      return rows.map((row) => ({
        id: row.id,
        total: row.total,
        status: row.status,
        date: row.date
      })) as Order[];
    } finally {
      connection.release();
    }
  }

  async updateOrderStatus(orderId: string, status: 'Pagado' | 'Creado' | 'Enviado'): Promise<Order | null> {
    const connection = await this.pool.getConnection();
    try {
      const [result] = await connection.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
      if ((result as any).affectedRows > 0) {
        const [order] = await connection.query<RowDataPacket[]>('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (order.length > 0) {
          return {
            id: order[0].id,
            total: order[0].total,
            status: order[0].status,
            date: order[0].date
          } as Order;
        }
      }
      return null;
    } finally {
      connection.release();
    }
  }

  async addProductToOrder(orderId: string, price: number, quantity: number): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query('INSERT INTO Ordenes_Productos (order_id, precio, cantidad) VALUES (?, ?, ?)', [orderId, price, quantity]);
    } finally {
      connection.release();
    }
  }

  async getOrderProducts(orderId: string): Promise<any[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>('SELECT precio, cantidad FROM Ordenes_Productos WHERE order_id = ?', [orderId]);
      return rows.map((row) => ({
        productId: row.producto_id,
        price: row.precio,
        quantity: row.cantidad
      }));
    } finally {
      connection.release();
    }
  }
  
}
