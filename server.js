import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configureCors from './config/corsConfig.js';
import requestLogger from './middleware/customMiddleware.js';
import { addTimeStamp } from './middleware/customMiddleware.js';
import  { globalErrorHandler } from './middleware/errorHandler.js';

//Create a new express app instance
const app = express();
const PORT = process.env.PORT || 3000;


//express json middleware

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(express.json());


//Error handler middleware
app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});

