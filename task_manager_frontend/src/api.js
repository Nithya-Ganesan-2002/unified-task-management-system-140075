//
// Backend API integration for Task Manager frontend
//

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001"; // customize if different

// Utility to handle auth token from localStorage
function getToken() {
  return localStorage.getItem("access_token");
}

// Helper to attach Auth header
function authHeaders(headers = {}) {
  const token = getToken();
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

// PUBLIC_INTERFACE
export async function register({ email, password, full_name }) {
  /** Register a new user. */
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// PUBLIC_INTERFACE
export async function login({ username, password }) {
  /** Login a user, returns { access_token, token_type } */
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /** Get the current user's profile */
  const res = await fetch(`${API_BASE}/api/users/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

// PUBLIC_INTERFACE
export async function getTasks({ skip = 0, limit = 100 } = {}) {
  /** Fetch a list of tasks assigned to the user */
  const res = await fetch(
    `${API_BASE}/api/tasks/?skip=${skip}&limit=${limit}`,
    { headers: authHeaders() }
  );
  if (!res.ok) throw new Error("Could not fetch tasks");
  return res.json();
}

// PUBLIC_INTERFACE
export async function getTask(taskId) {
  /** Fetch a single task */
  const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Could not fetch task");
  return res.json();
}

// PUBLIC_INTERFACE
export async function createTask(data) {
  /** Create a new task */
  const res = await fetch(`${API_BASE}/api/tasks/`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Could not create task");
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateTask(taskId, data) {
  /** Update a task */
  const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Could not update task");
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteTask(taskId) {
  /** Delete a task */
  const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (res.status !== 204) throw new Error("Could not delete task");
  return true;
}

// PUBLIC_INTERFACE
export async function completeTask(taskId) {
  /** Mark a task as complete */
  const res = await fetch(`${API_BASE}/api/tasks/${taskId}/complete`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Could not complete task");
  return res.json();
}
