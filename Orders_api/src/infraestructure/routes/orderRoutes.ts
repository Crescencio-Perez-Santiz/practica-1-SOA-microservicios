import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { OrderUseCase } from '../../application/usecases/OrderUseCase';
import { OrderRepositoryImpl } from '../repositories/OrderRepositoryImpl';

const router = express.Router();

const orderRepository = new OrderRepositoryImpl();
const orderUseCase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUseCase);

router.post('/', async (req, res) => await orderController.createOrder(req, res));
router.get('/', async (req, res) => await orderController.listOrders(req, res));
router.put('/:id/status', async (req, res) => await orderController.updateOrderStatus(req, res));

router.post('/:orderId/products', async (req, res) => await orderController.addProductToOrder(req, res));
router.get('/:orderId/products', async (req, res) => await orderController.getOrderProducts(req, res));

export default router;
