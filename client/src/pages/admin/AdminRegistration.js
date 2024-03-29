import React, { useState } from "react";

function AdminRegistration() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/user/admin/newadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage(
          "Registration successful. Please check your email for confirmation."
        );
      } else {
        console.error("Error registering admin:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1>Admin registration</h1>
      {confirmationMessage && <p>{confirmationMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={FormData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminRegistration;
