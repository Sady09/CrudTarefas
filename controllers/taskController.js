import Task from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    if (!tasks) {
      return res.status(500).json({ error: "Tasks nao encontrdas no banco de dados" })
    }
    res.status(200).json({ tasks })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar exibir todas as task" })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(500).json({ error: "Task com esse id nao encontrado no banco de dados" })
    }
    res.status(200).json({ task })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar exibir a task" })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, done } = req.body;

    const newTask = new Task({ title, done });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar criar task" })
  }
}

export const updatedTask = async (req, res) => {
  try {
    const { title, done } = req.body;
    const { id } = req.params;
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ error: "Id nao encontrado no banco de dados" })
    }

    task.title = title;
    task.done = done;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar atualizar task" })

  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id)
    if (!deleteTask) {
      return res.status(200).json({ message: "Id nao encontrado no banco de dados" })
    }
    res.status(200).json({ message: "Task deletada com sucesso" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar deletar a task" })

  }
}