import React from "react";

// PUBLIC_INTERFACE
export default function AccountPanel({ user }) {
  if (!user) return null;
  return (
    <div className="account-panel" style={{ padding: "2.2rem" }}>
      <h2>Account Information</h2>
      <table style={{ fontSize: "1.07rem" }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 500 }}>Email:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 500 }}>Full Name:</td>
            <td>{user.full_name || <i>(Not set)</i>}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 500 }}>Status:</td>
            <td>
              {user.is_active ? (
                <span style={{ color: "#4caf50" }}>Active</span>
              ) : (
                <span style={{ color: "#e1483a" }}>Inactive</span>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 500 }}>User ID:</td>
            <td>{user.id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
