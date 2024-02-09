import express from 'express';
import apiRoute, { apiProtected } from './routes/api.js';
import mongoose from 'mongoose';
import { db_connect } from './utils/constant.js';
import authMiddleware from './middlewares/authMiddleware.js';
const app= express();
import cors from 'cors';
app.use(cors())
mongoose.connect(db_connect);

// Event handlers for connection events
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

const PORT=8000;
app.use(express.json());
app.use('/api/',apiRoute);

app.use('/api/',authMiddleware,apiProtected);
app.listen(PORT,()=>console.log('server is running'));
