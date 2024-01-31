import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { PORT } from './config';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
