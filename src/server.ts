import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';
import orderProductRoutes from './handlers/order-products';

const app: express.Application = express();
const address: string = 'http://localhost:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Server running!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
orderProductRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
