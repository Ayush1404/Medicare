import express from 'express';
require('dotenv').config();
import cors from 'cors';
require('./config/dbConfig')
import {router as userRouter} from './routes/userRoutes'  ;
const app = express();
const port = process.env.PORT || 7000 ;
app.use(cors());
app.use(express.json());


app.use('/api/user',userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});