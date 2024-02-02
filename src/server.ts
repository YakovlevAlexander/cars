import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
import { PORT, MONGODB_URI } from './config';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const app = express();
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDb connection error', error);
});

db.once('open', () => {
  console.log('MongoDB connected');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
