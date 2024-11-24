import express from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from '../db/tasks';
import knex from '../../server/db/connection.ts';

const router = express.Router();

// GET /api/tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks(knex);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - Add a new task
router.post('/', async (req, res) => {
  const { task, task_details, priority, completed } = req.body;

  // Check for missing fields
  if (!task || priority === undefined || completed === undefined) {
    return res.status(400).json({ error: 'Missing required fields: task, priority, completed' });
  }

  // Convert priority string to number and completed to boolean
  const priorityNumber = typeof priority === 'string' ? parseInt(priority, 10) : priority;
  const completedBoolean = completed === 'yes' || completed === true;

  // Validate the data
  if (isNaN(priorityNumber) || typeof completedBoolean !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const newTask = await addTask(knex, { task, task_details, priority: priorityNumber, completed: completedBoolean });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// PATCH /api/tasks/:id - Update a task
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await updateTask(knex, Number(id), updates);
    if (updatedTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteTask(knex, Number(id));
    if (deleted === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;