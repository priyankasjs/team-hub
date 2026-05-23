import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <section className="page-card">
      <h1>Something went wrong</h1>
      <p>A routing error occurred while loading this page.</p>
      <pre className="error-box">
        {error?.statusText || error?.message || "Unknown error"}
      </pre>
      <Link to="/" className="btn-link">
        Return Home
      </Link>
    </section>
  );
}