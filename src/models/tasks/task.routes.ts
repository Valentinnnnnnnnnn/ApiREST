import { Router } from 'express'
import { TaskController } from './task.controller'

export const taskRouter = Router()

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     description: Retrieve all tasks from the task collection. Possibility to use filters (status, priority, dueDate).
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter tasks by status (completed or not).
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         required: false
 *         description: Filter tasks by priority level.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       500:
 *         description: Server error.
 *
 *   post:
 *     summary: Create a new task
 *     description: Create a new task and add it to the task collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server error.
 *
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a single task
 *     description: Retrieve a task by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single task.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 *
 *   put:
 *     summary: Update an existing task
 *     description: Update task details identified by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task to update.
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
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 *
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from the collection using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 *
 * @swagger
 * /tasks/{id}/toggle:
 *   put:
 *     summary: Toggle task completion status
 *     description: Toggle the completion state of an existing task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task to toggle.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task completion status toggled successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
taskRouter.get('/', TaskController.getAllTasks)

taskRouter.post('/', TaskController.createTask)

taskRouter.get('/:id', TaskController.getTask)

taskRouter.put('/:id', TaskController.updateTask)

taskRouter.delete('/:id', TaskController.deleteTask)

taskRouter.put('/:id/toggle', TaskController.toggleTaskComplete)
