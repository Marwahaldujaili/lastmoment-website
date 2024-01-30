import React, { useState } from "react";

function AdminLogin() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/user/admin/adminlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        // Optionally, you can redirect the user to another page or show a success message.
      } else {
        console.error("Login failed:", data.error);
        // Handle the error (e.g., display an error message to the user).
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle unexpected errors.
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
