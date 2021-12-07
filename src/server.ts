import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';

const app: express.Application = express()
const address: string = "http://localhost:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Server running!')
})

userRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
