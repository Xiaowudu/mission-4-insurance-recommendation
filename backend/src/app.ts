import express, { type Application} from 'express';
import cors from 'cors';
import { router } from './routes.js';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

export { app };

