import React, { useState, useEffect } from "react";
import "../../styles/AdminProfile.scss";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/admin/profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching admin profile");
        }
        const data = await response.json();
        setAdminData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin profile", error);
        setLoading(false);
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/admin/logout`, {
        method: "POST",
        credentials: "include", // Include credentials (cookies) in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error logging out");
      }

      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Admin Profile</h1>
      {loading && <p>Loading...</p>}
      {adminData && (
        <div>
          <p>Email: {adminData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
