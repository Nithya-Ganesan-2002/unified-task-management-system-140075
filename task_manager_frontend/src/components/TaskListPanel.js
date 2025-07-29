import React from "react";
import "./TaskListPanel.css";

// PUBLIC_INTERFACE
export default function TaskListPanel({
  tasks,
  onSelect,
  onCreate,
  selectedId,
  loading,
}) {
  return (
    <div className="tasklist-panel">
      <div className="tasklist-header">
        <span className="tasklist-title">My Tasks</span>
        <button className="tasklist-newbtn" onClick={onCreate}>
          + New Task
        </button>
      </div>
      {loading && <div className="tasklist-loading">Loading...</div>}
      {tasks && tasks.length === 0 && !loading && (
        <div className="tasklist-empty">No tasks found.</div>
      )}
      <ul className="tasklist">
        {tasks &&
          tasks.map(task => (
            <li
              className={
                "tasklist-item" + (task.id === selectedId ? " selected" : "")
              }
              key={task.id}
              onClick={() => onSelect(task)}
            >
              <div>
                <span className="task-title">{task.title}</span>
                {task.completed && (
                  <span className="task-completed">✔️</span>
                )}
              </div>
              <div className="tasklist-secondary">
                <span>
                  Due:{" "}
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
