import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { OrderUseCase } from '../../application/usecases/OrderUseCase';
import { OrderRepositoryImpl } from '../repositories/OrderRepositoryImpl';

const router = express.Router();

const orderRepository = new OrderRepositoryImpl();
const orderUseCase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUseCase);

router.post('/orders', async (req, res) => await orderController.createOrder(req, res));
router.get('/orders', async (req, res) => await orderController.listOrders(req, res));
router.put('/orders/:id/status', async (req, res) => await orderController.updateOrderStatus(req, res));

export default router;