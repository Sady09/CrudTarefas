import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authMiddleware } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerConfig.js';

const app = express()
const port = process.env.PORT || 3333;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB Atlas:", err));

app.use(express.json());
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/tasks', authMiddleware, taskRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);

})