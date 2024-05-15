import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './infraestructure/routes/orderRoutes';

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

