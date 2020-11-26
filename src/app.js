import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import MongoConnection from './configs/mongo.config';
import apiRoutes from './routes/api.routes';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.mongo = new MongoConnection(process.env.MONGODB_URI);

        this.activateAppMiddlewares();
        this.activateAppRoutes();
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
}

const app = new App();
app.startApp();
