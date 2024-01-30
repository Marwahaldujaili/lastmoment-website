import React, { useState } from "react";

const EditAdmin = () => {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const [newEmail, setNewEmail] = useState("");

  const handleEditAdmin = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/admin/edit`, {
        method: "PUT",
        credentials: "include", // Include credentials (cookies) in the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
      });

      if (!response.ok) {
        throw new Error("Error editing admin");
      }

      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error editing admin:", error);
    }
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
        <button type="button" onClick={handleEditAdmin}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAdmin;
