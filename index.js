import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js'

const app = express()
const port = 3333

mongoose.connect("mongodb://localhost:27017/todolist", {
})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

app.use(express.json());
app.use('/', taskRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);

})