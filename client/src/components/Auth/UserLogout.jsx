import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const UserLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const logoutUser = async () => {
        await api.post("/auth/logout", {});
      };
      logoutUser();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  return <div>logging out...</div>;
};

export default UserLogout;
