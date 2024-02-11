import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditAdmin = () => {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEditAdmin = async () => {
    try {
      // Validate email
      if (!isValidEmail(newEmail) || newEmail !== confirmEmail) {
        setEmailError(
          "Please enter a valid email address and ensure it matches the confirmation."
        );
        return;
      }

      // Clear previous error
      setEmailError("");

      const response = await fetch(`${apiUrl}/user/admin/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
      });

      if (!response.ok) {
        throw new Error("Error editing admin");
      }

      // Handle success, e.g., redirect or show a success message

      // Clear fields after successful edit
      setNewEmail("");
      setConfirmEmail("");
    } catch (error) {
      console.error("Error editing admin:", error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h2>Edit Admin Profile</h2>
      <form>
        <label>New Email:</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label>Confirm Email:</label>
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <button type="button" onClick={handleEditAdmin}>
          Save Changes
        </button>
        <Link to="/admin/profile">
          <button type="button">Cancel</button>
        </Link>{" "}
      </form>
    </div>
  );
};

export default EditAdmin;
