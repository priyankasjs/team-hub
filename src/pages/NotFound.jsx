import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-card">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <Link to="/" className="btn-link">
        Return Home
      </Link>
    </section>
  );
}