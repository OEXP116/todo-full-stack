import React from 'react';

interface Task {
  id: number;
  task: string;
  task_details: string;
  priority: number;
  completed: boolean;
}

interface MainProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}


function Main({ tasks, onToggleTask, onDeleteTask }) {
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                />
                <label>{task.task}</label>
                <button className="destroy" onClick={() => onDeleteTask(task.id)} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default Main