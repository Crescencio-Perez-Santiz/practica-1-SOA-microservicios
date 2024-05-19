// En DBConnection.ts
import { config } from "dotenv";
import { createConnection } from "typeorm";
import OrderModel from '../infraestructure/Models/Order';

export { OrderModel };

const result = config();

if (result.error) {
  throw result.error;
}

// console.log(result.parsed);

export class DBConnection {
  constructor() {
    try {
      
      createConnection({
        type: 'mysql',
        host: process.env.DB_HOST_MYSQL,
        port: parseInt(process.env.DB_PORT_MYSQL!),
        username: process.env.DB_USER_MYSQL!,
        password: process.env.DB_PASSWORD_MYSQL!,
        database: process.env.DB_DATABASE_MYSQL!,
        entities: [OrderModel],
        synchronize: true,
      }).then(() => {
        console.log('Conexión exitosa a la base de datos con MySQL LISTA!');
      });
    } catch (e) {
      console.error(`Error al conectar a la base de datos: ${e}`);
    }
  }
}

export const dbConnection = new DBConnection();