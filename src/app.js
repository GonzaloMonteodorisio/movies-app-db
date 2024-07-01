import express from 'express';
import bodyParserMiddleware from './middlewares/bodyParser.js';
import userRoutes from './routes/userRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();

app.use(bodyParserMiddleware);
app.use('/api', userRoutes);
app.use('/api', characterRoutes);
app.use('/api', commentRoutes);
app.use('/api', movieRoutes);

export default app;