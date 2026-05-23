import React from "react";

export default function About() {
  return (
    <section className="page-card">
      <h1>About Team Hub</h1>
      <p>
        Team Hub is an internal single-page application designed to help staff
        browse employee records, view certification cards, and access protected
        dashboard content through nested routes.
      </p>
      <p>
        This project demonstrates React Router v6, route nesting, protected
        access, URL params, search params, and React hooks for state and data
        handling.
      </p>
    </section>
  );
}