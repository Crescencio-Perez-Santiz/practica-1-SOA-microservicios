import { Request, Response } from 'express';
import { OrderUseCase } from '../../application/usecases/OrderUseCase';

export class OrderController {
  constructor(private orderUseCase: OrderUseCase) { }

  async createOrder(req: Request, res: Response) {
    try {
      const { total, status } = req.body;
      const order = await this.orderUseCase.createOrder(total, status);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating order' });
    }
  }


  async listOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderUseCase.listOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
      const order = await this.orderUseCase.updateOrderStatus(orderId, status);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.json(order);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status' });
    }
  }
}
