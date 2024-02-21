import express from "express";
import { router as hotelRouter } from './routes/hotel.routes.js';
import { router as clientRouter } from './routes/client.routes.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use('/clients', hotelRouter);
app.use('/hotel', clientRouter);

app.listen(port, () => {
    console.log(`App started, listening to port ${port}`);
});