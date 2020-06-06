import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import { errors } from 'celebrate';

// Controllers
import ItemRoutes from './routes/items';
import PointController from './controllers/PointController';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use('/items', ItemRoutes);
app.use('/points', PointController);

app.use(errors());

export default app;
