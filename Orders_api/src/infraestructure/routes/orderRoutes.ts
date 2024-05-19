import express, {Router} from 'express';
import { CreateOrderController } from '../controllers/CreateOrderController';
import { OrderRepository } from '../repositories/OrderRepository';

const router : Router = express.Router();
const repository: OrderRepository = new OrderRepository();

const createOrderController: CreateOrderController = new CreateOrderController(repository);


//Rutas
router.post('/', async (req, res) => {
    await createOrderController.create(req, res);
})


export default router;
