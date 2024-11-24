import { Knex } from 'knex';

// Fetch all tasks
export async function getAllTasks(knex: Knex) {
  return knex('tasks').select('*');
}

// Add a new task
export async function addTask(knex: Knex, task: { task: string; task_details?: string; priority: number; completed: boolean }) {
  return knex('tasks').insert(task).returning('*');
}

// Update an existing task
export async function updateTask(knex: Knex, id: number, updates: Partial<{ task: string; task_details: string; priority: number; completed: string }>) {
  return knex('tasks').where('id', id).update(updates).returning('*');
}

// Delete a task
export async function deleteTask(knex: Knex, id: number) {
  return knex('tasks').where('id', id).del();
}