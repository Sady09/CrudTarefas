import express from 'express';
import mongoose from 'mongoose';
import Task from './models/taskModel';

const app = express()
const url = "http://localhost:3333/"
const port = 3333

mongoose.connect("mongodb://localhost:27017/todolist", {
})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {

  }


})

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(500).json({ error: "Task ou id nao encontrada" })
    }
    res.status(200).json({ task })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao pegar task" })
  }
})

app.post('/', async (req, res) => {
  try {
    const { title, done } = req.body;

    const newTask = new Task({ title, done });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar task" })
  }
})

app.put('/:id', async (req, res) => {
  try {
    const { title, done } = req.body;
    const { id } = req.params;
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ error: "Id nao encontrado" })
    }

    task.title = title;
    task.done = done;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar task" })

  }
})
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id)
    if (!deleteTask) {
      return res.status(200).json({ message: "Id nao encontrado" })
    }
    res.status(200).json({ message: "Task deletada com sucesso" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar a task" })

  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);

})