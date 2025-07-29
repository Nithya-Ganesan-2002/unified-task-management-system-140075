import React, { useState } from "react";
import "./AuthForm.css";

// PUBLIC_INTERFACE
export default function AuthForm({ onLogin, onRegister, error }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === "login") {
      onLogin(form.email, form.password);
    } else {
      onRegister(form.email, form.password, form.full_name);
    }
  };

  return (
    <div className="authform-container">
      <form className="authform" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Log In" : "Register"}</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            required
            onChange={handleChange}
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            required
            minLength={6}
            onChange={handleChange}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>
        {mode === "register" && (
          <label>
            Full Name (optional)
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              autoComplete="name"
            />
          </label>
        )}
        {error && <div className="authform-error">{error}</div>}
        <button className="authform-btn" type="submit">
          {mode === "login" ? "Sign In" : "Register"}
        </button>
        <div className="authform-toggle">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span onClick={() => setMode("login")}>Log in</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
