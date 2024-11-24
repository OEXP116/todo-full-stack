import axios from 'axios';

// Set up the API client with the base URL for your backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',  
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await apiClient.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
// Create a new task
export const createTask = async (task: { task: string; task_details: string; priority: string; completed: boolean }) => {
    try {
      const response = await apiClient.post('/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      throw error;
    }
  };

// Update a task
export const updateTask = async (id: number, updatedTask: { task: string; task_details: string; priority: string; completed: boolean }) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};