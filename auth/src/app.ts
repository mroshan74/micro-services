import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import cookieSession from 'cookie-session'
import router from './config/routes';
import { errorHandler } from './app/middlewares/error-handlers/error-handler';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
    secure: false,
    signed: false
}));
app.use('/api',router);

app.use(errorHandler);

export { app }