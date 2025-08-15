/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operações com tarefas (privadas por usuário)
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas do usuário logado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno ao buscar tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa para o usuário logado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos para criação
 *       401:
 *         description: Token inválido ou ausente
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno ao buscar tarefa
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno ao atualizar tarefa
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno ao deletar tarefa
 */

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

