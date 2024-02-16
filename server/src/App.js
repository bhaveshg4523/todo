// Importing the Express framework
import express from 'express';

// Importing route handlers from the api.js file located in the routes directory
import apiRoute, { apiProtected } from './routes/api.js';

// Importing MongoDB object modeling tool for Node.js
import mongoose from 'mongoose';

// Importing the database connection string from the constant.js file located in the utils directory
import { db_connect } from './utils/constant.js';

// Importing authentication middleware from the authMiddleware.js file located in the middlewares directory
import authMiddleware from './middlewares/authMiddleware.js';

// Initializing the Express application
const app = express();

// Importing Cross-Origin Resource Sharing (CORS) middleware
import cors from 'cors';

// Applying the CORS middleware to the Express app to allow cross-origin requests
app.use(cors())

// Connecting to the MongoDB database using the connection string
mongoose.connect(db_connect);

// Event handler for when the MongoDB connection is established
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Defining the port on which the server will listen for incoming requests
const PORT = 8000;

// Middleware to parse JSON-encoded request bodies
app.use(express.json());

// Mounting the apiRoute middleware to handle requests with paths starting with '/api/'
app.use('/api/', apiRoute);

// Mounting the authMiddleware followed by apiProtected middleware to handle protected API routes with paths starting with '/api/'
app.use('/api/', authMiddleware, apiProtected);

// Starting the Express app, listening for incoming HTTP requests on the specified port
app.listen(PORT, () => console.log('Server is running'));
