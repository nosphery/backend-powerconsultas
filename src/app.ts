import express from 'express';
import cors from 'cors';

import routes from './routes';
import config from './config/config.json';

import MySQL from './database/MySQL';

const database = new MySQL(config.databases.mysql);
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

database.start().then(()=> app.listen(3000, ()=> console.log(`back-end started in 3000.`)))
