import express, { Application } from "express";
import orderRoutes from "./infraestructure/routes/orderRoutes";
import { config } from "dotenv";

config();

const app: Application = express();

app.use(express.json());

const PORT = 3002;
const nameService = "service orders";

app.use("/", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server ${nameService} is running on port ${PORT}`);
});
