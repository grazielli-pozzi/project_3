import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import MongoConnection from './configs/mongo.config';
import apiRoutes from './routes/api.routes';
import errorHandling from './middlewares/errorHandling';
import request404Handling from './middlewares/request404Handling';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.app.use(cors({
            origin: process.env.FRONT_END_URL,
          }));
        this.mongo = new MongoConnection(process.env.MONGODB_URI);
        this.startMongoConnection();
        this.activateAppMiddlewares();
        this.activateAppRoutes();

        this.activateErrorHandling();
        this.activateNotFoundRequest();

    }

    startMongoConnection() {
        this.mongo.startConnection();
    }

    activateAppMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: process.env.FRONT_END_URL,
        }));
    }

    activateAppRoutes() {
        this.app.use('/api', apiRoutes);
    }

    startApp() {
        this.app.listen(process.env.PORT, () => console.log('listening'));
    }

    activateErrorHandling() {
        this.app.use(errorHandling.handle);
    }

    activateNotFoundRequest() {
        this.app.use(request404Handling.handle);
    }
}

const app = new App();
app.startApp();
