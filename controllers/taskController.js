import Task from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ ownerId: req.user.id })
    if (!tasks) {
      return res.status(404).json({ error: "Tasks nao encontradas no banco de dados" })
    }
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar exibir todas as tasks" })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    })
    if (!task) {
      return res.status(500).json({ error: "Task com esse id nao encontrado no banco de dados" })
    }
    res.status(200).json(task)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar exibir a task" })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, done } = req.body;
    const task = await Task.create({ title, done, ownerId: req.user.id });

    res.status(201).json({ message: "Task criada com sucesso", task });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar criar task" })
  }
}

export const updatedTask = async (req, res) => {
  try {
    const { title, done } = req.body;
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { $set: { title, done } },
      { new: true, runValidators: true }
    )
    if (!updated) {
      return res.status(404).json({ error: "Task não encontrada" })
    }

    res.status(200).json({ message: "Task editada com sucesso" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar atualizar task" })

  }
}

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id
    })

    if (!deleteTask) {
      return res.status(400).json({ message: "Task não encontrada" })
    }
    res.status(200).json({ message: "Task deletada com sucesso" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar deletar a task" })

  }
}