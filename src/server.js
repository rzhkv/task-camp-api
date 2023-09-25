import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/api.js';

import { connectToDatabase, sequelize } from './config/database.config.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());



app.get('/api/healthchecker', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API was started and working atwell!',
  });
});

app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Route dost not exist`,
  });
});

app.listen(PORT, async () => {
  console.log('Server started!');

  await connectToDatabase();

  sequelize.sync({ force: false }).then(() => {
    console.log('✅Synced database successfully...');
  });
});
