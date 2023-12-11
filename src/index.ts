import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from "express";
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import { dbConnect } from "./utils/helpers";
import * as TaskController from './controllers/task';

dbConnect();

const app = express();

app.use(express.json());
app.use(cors());
app.use(multer().any());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200 })
})


app.get('/tasks/', TaskController.getTasks);
app.post('/tasks', TaskController.addTask);
app.put('/tasks', TaskController.updateTask);
app.delete('/tasks', TaskController.deleteTask);

app.listen(1234);