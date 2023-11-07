import express from 'express';
require('dotenv').config();
import cors from 'cors';
require('./config/dbConfig')
import {router as userRouter} from './routes/userRoutes'
import {router as adminRouter} from './routes/adminRoutes'  ;
import {router as doctorRouter} from './routes/doctorRoutes'
const app = express();
const port = process.env.PORT || 7000 ;
app.use(cors());
app.use(express.json());


app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});