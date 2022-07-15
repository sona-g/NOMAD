import express from "express";
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config()

//dependencies
const app = express();
const port = process.env.PORT;
const morgan = require('morgan');

//mongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongoDB"))
.catch((err) => console.log("mongoDB connection error", err));

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//port
app.listen(port, () => console.log(`Server is running on ${port}`))

