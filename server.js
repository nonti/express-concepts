import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configureCors from './config/corsConfig.js';
import requestLogger from './middleware/customMiddleware.js';
import { addTimeStamp } from './middleware/customMiddleware.js';
import  { globalErrorHandler } from './middleware/errorHandler.js';
import { urlVersioning } from './middleware/apiVersioning.js';
import  { createBasicRateLimitter } from './middleware/rateLimiting.js';
import itemsRoutes from './routes/item-routes.js';
//Create a new express app instance
const app = express();
const PORT = process.env.PORT || 3000;


//express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimitter(100, 15 * 60 * 1000));
app.use(express.json());

app.use(urlVersioning('v1'));

//Routes
app.use('/api/v1', itemsRoutes);

//Error handler middleware
app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});

