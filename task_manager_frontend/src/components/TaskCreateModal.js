import React, { useState } from "react";
import "./TaskCreateModal.css";

// PUBLIC_INTERFACE
export default function TaskCreateModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  React.useEffect(() => {
    if (open) {
      setForm({
        title: "",
        description: "",
        due_date: "",
      });
    }
  }, [open]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreate({
      title: form.title,
      description: form.description,
      due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
    });
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="taskcreate-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit} className="taskcreate-form">
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
              value={form.description}
              onChange={handleChange}
              maxLength={4096}
            />
          </label>
          <label>
            Due Date
            <input
              type="datetime-local"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="taskcreate-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
