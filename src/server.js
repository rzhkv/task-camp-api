import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/api.js';
import { connectToDatabase, sequelize } from './config/database.config.js';

// app setup
const app = express();
const PORT = process.env.PORT || 3000;

// include morgan for dev
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// parse request
app.use(express.json({ limit: '10kb' }));

// parse request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

// state
app.use((req, res, next) => {
  req.state = {};
  return next();
});


// Api checher
app.get('/api/healthchecker', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API was started and working atwell!',
  });
});

// routing
app.use('/api/v1', router);

// set 404 for another routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Route dost not exist`,
  });
});

// app start
app.listen(PORT, async () => {
  console.log('Server started!');

  await connectToDatabase();

  sequelize.sync({ force: 0 }).then(() => {
    console.log('✅Synced database successfully...');
  });
});
