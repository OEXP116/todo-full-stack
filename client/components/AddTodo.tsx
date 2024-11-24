import React, { useState } from 'react';

interface AddTodoProps {
  onAddTask: (task: { task: string; task_details: string; priority: number; completed: boolean }) => void;
}

function AddTodo({ onAddTask }: AddTodoProps) {
  const [task, setTask] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [priority, setPriority] = useState('low');

  // Map priority string to numeric value
  const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      // Pass numeric priority and boolean completed
      onAddTask({
        task,
        task_details: taskDetails,
        priority: priorityMap[priority] || 1, // Default to 1 if invalid priority
        completed: false, // Default completed status to false for new tasks
      });
      setTask('');
      setTaskDetails('');
      setPriority('low');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        autoFocus
      />
      <input
        type="text"
        placeholder="Task details"
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTodo;