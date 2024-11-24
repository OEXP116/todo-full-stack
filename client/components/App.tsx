import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../apis/tasks';  // Import the API functions
import AddTodo from './AddTodo';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

function App() {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (task: { task: string; task_details: string; priority: string }) => {
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task completion status
  const handleToggleTask = async (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      try {
        await updateTask(taskId, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, completed: updatedTask.completed } : task))
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <section className="todoapp">
        <Header />
        <AddTodo onAddTask={handleAddTask} />
        <Main tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
        <Footer tasks={tasks} />
      </section>
    </>
  );
}

export default App;