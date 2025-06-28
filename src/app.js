import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { addLogger } from './middlewares/logger.js';

import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import loggerRouter from './routes/logger.router.js';

import { swaggerUiExpress, specs } from './utils/swagger.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB con manejo básico de errores y log
mongoose.connect('mongodb://127.0.0.1:27017/mascotas')
  .then(() => logger.info('✅ Conectado a MongoDB'))
  .catch(err => logger.error('❌ Error conectando a MongoDB:', err));

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoption', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', loggerRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Arrancar servidor
app.listen(PORT, () => {
  logger.info(`✅ Servidor escuchando en el puerto ${PORT}`);
});

export default app;
