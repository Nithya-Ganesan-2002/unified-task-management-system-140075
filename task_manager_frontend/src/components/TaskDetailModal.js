import React, { useState } from "react";
import "./TaskDetailModal.css";

// PUBLIC_INTERFACE
export default function TaskDetailModal({
  task,
  open,
  onClose,
  onSave,
  onDelete,
  onComplete,
}) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(task);

  React.useEffect(() => {
    setForm(task || {});
    setEdit(false);
  }, [task]);

  if (!open || !task) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
    setEdit(false);
  };

  return (
    <div className="modal-overlay">
      <div className="taskdetail-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        {!edit ? (
          <>
            <h2>
              {task.title}{" "}
              {task.completed && <span className="task-completed">✔️</span>}
            </h2>
            <div>
              <label>
                <b>Description:</b>
                <div className="taskdetail-desc">
                  {task.description || <i>No description</i>}
                </div>
              </label>
            </div>
            <div>
              <label>
                <b>Due:</b>{" "}
                {task.due_date
                  ? new Date(task.due_date).toLocaleString()
                  : <i>None</i>}
              </label>
            </div>
            <div>
              <b>Status:</b> {task.completed ? "Completed" : "Active"}
            </div>
            <div className="taskdetail-actions">
              {!task.completed && (
                <button
                  onClick={() => setEdit(true)}
                  className="taskdetail-btn"
                >
                  Edit
                </button>
              )}
              {!task.completed && (
                <button
                  onClick={() => onComplete(task)}
                  className="taskdetail-btn green"
                >
                  Mark Complete
                </button>
              )}
              <button onClick={() => onDelete(task)} className="taskdetail-btn red">
                Delete
              </button>
            </div>
          </>
        ) : (
          <form className="taskdetail-editform" onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={128}
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                maxLength={4096}
              />
            </label>
            <label>
              Due Date
              <input
                type="datetime-local"
                name="due_date"
                value={
                  form.due_date
                    ? form.due_date.slice(0, 16)
                    : ""
                }
                onChange={handleChange}
              />
            </label>
            <div className="taskdetail-actions">
              <button type="submit" className="taskdetail-btn">
                Save
              </button>
              <button
                type="button"
                className="taskdetail-btn"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
