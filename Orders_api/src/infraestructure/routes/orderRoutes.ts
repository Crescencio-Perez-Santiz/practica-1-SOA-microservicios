import express, { Router } from "express";
import { CreateOrderController } from "../controllers/CreateOrderController";
import { ListOrdersController } from "../controllers/ListOrdersController";
import { UpdateOrderStatusController } from "../controllers/UpdateTrackingController";
import { OrderRepository } from "../repositories/OrderRepository";

const router: Router = express.Router();
const repository: OrderRepository = new OrderRepository();

const createOrderController: CreateOrderController = new CreateOrderController(
    repository
);
const listOrdersController: ListOrdersController = new ListOrdersController(
    repository
);

const updateOrderStatusController: UpdateOrderStatusController =
    new UpdateOrderStatusController(repository);

//Rutas
router.post("/", async (req, res) => {
    await createOrderController.create(req, res);
});

router.get("/", async (req, res) => {
    await listOrdersController.listAll(req, res);
});

router.put("/:id/status", async (req, res) => {
    await updateOrderStatusController.updateStatus(req, res);
});

export default router;
