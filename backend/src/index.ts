import express from 'express'
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import { mongoConnect } from './db.js';

const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1",userRoute)
mongoConnect();

app.listen(4000);