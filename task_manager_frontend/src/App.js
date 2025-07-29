import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/Sidebar.css";
import "./components/Topbar.css";
import "./components/TaskListPanel.css";
import "./components/TaskDetailModal.css";
import "./components/TaskCreateModal.css";
import "./components/AuthForm.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TaskListPanel from "./components/TaskListPanel";
import TaskDetailModal from "./components/TaskDetailModal";
import TaskCreateModal from "./components/TaskCreateModal";
import AuthForm from "./components/AuthForm";
import AccountPanel from "./components/AccountPanel";
import {
  login,
  register,
  getCurrentUser,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "./api";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  // UI state
  const [sidebarSelected, setSidebarSelected] = useState("tasks");
  // Auth state
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  // Task state
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On mount, try to auto-login (if token available)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
        loadTasks();
      } catch {
        setUser(null);
      }
    };
    if (localStorage.getItem("access_token")) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, []);

  // Sidebar switching resets some UI
  useEffect(() => {
    setSelectedTask(null);
    setShowDetailModal(false);
    setShowCreateModal(false);
  }, [sidebarSelected]);

  // Loads all tasks for the logged in user
  async function loadTasks() {
    setLoadingTasks(true);
    try {
      const t = await getTasks();
      setTasks(Array.isArray(t.tasks) ? t.tasks : []);
    } catch {
      setTasks([]);
    }
    setLoadingTasks(false);
  }

  // Handles user login
  async function handleLogin(email, password) {
    try {
      setAuthError(null);
      const tokenResponse = await login({ username: email, password });
      localStorage.setItem("access_token", tokenResponse.access_token);
      const u = await getCurrentUser();
      setUser(u);
      loadTasks();
    } catch (e) {
      setAuthError("Login failed: " + (e.message || "Unknown"));
    }
  }

  // Handles user register
  async function handleRegister(email, password, full_name) {
    try {
      setAuthError(null);
      await register({ email, password, full_name });
      await handleLogin(email, password);
    } catch (e) {
      setAuthError("Registration failed: " + (e.message || "Unknown"));
    }
  }

  // Logout
  function handleLogout() {
    setUser(null);
    setTasks([]);
    localStorage.removeItem("access_token");
  }

  // Select and show a task
  async function handleSelectTask(task) {
    try {
      const fullTask = await getTask(task.id);
      setSelectedTask(fullTask);
      setShowDetailModal(true);
    } catch {
      setSelectedTask(task);
      setShowDetailModal(true);
    }
  }

  // CRUD handlers
  async function handleCreateTask(data) {
    try {
      await createTask(data);
      setShowCreateModal(false);
      loadTasks();
    } catch (err) {
      window.alert("Failed to create task.");
    }
  }

  async function handleSaveTask(task) {
    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        assigned_to: task.assigned_to,
        completed: task.completed,
      });
      setShowDetailModal(false);
      loadTasks();
    } catch {
      window.alert("Failed to update task.");
    }
  }

  async function handleDeleteTask(task) {
    if (!window.confirm("Delete this task? This cannot be undone.")) return;
    try {
      await deleteTask(task.id);
      setShowDetailModal(false);
      loadTasks();
    } catch {
      window.alert("Failed to delete task.");
    }
  }

  async function handleCompleteTask(task) {
    try {
      await completeTask(task.id);
      setShowDetailModal(false);
      loadTasks();
    } catch {
      window.alert("Failed to mark as completed.");
    }
  }

  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  }

  // Render: Auth
  if (!user) {
    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Topbar
          title="Task Manager"
          onThemeToggle={toggleTheme}
          theme={theme}
        />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            error={authError}
          />
        </div>
      </div>
    );
  }

  // Render: Dashboard app shell
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "row", background: "var(--bg-primary)" }}>
      <Sidebar
        user={user}
        onLogout={handleLogout}
        selected={sidebarSelected}
        onSelect={setSidebarSelected}
      />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        <Topbar
          title={sidebarSelected === "tasks" ? "My Tasks" : "Account"}
          onThemeToggle={toggleTheme}
          theme={theme}
        >
          {/* Spacer for future actions */}
        </Topbar>
        <div style={{ display: "flex", flex: 1 }}>
          {sidebarSelected === "tasks" && (
            <TaskListPanel
              tasks={tasks}
              loading={loadingTasks}
              onSelect={handleSelectTask}
              onCreate={() => setShowCreateModal(true)}
              selectedId={selectedTask ? selectedTask.id : null}
            />
          )}
          {sidebarSelected === "account" && (
            <AccountPanel user={user} />
          )}
        </div>
      </main>
      {/* Task details modal */}
      <TaskDetailModal
        task={selectedTask}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
      {/* Task create modal */}
      <TaskCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}

export default App;
