import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <section className="login-card">
      <p className="eyebrow">Protected Access</p>
      <h1>{isAuthenticated ? "You are already logged in." : "Login"}</h1>
      <p>
        Click the button below to simulate authentication and continue to the
        protected dashboard.
      </p>

      <button className="btn-primary" onClick={handleLogin}>
        Sign In
      </button>
    </section>
  );
}