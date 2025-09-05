import express from 'express';
import cors from 'cors';
import vehicleTypesRouter from './routes/vehicleTypes.js';
import vehiclesRouter from './routes/vehicles.js';
import bookingsRouter from './routes/bookings.js';


const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/vehicle-types', vehicleTypesRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/bookings', bookingsRouter);


export default app;