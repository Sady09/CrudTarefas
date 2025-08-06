import { createTask, deleteTask, getAllTasks, getTaskById, updatedTask } from '../controllers/taskController.js';
import { Router } from 'express';

const router = Router()

//Tasks routes
router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updatedTask)
router.delete('/:id', deleteTask)

export default router;

