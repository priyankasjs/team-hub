import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMembers } from "../data/teamService";

export default function Home() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadMembers();
  }, []);

  return (
    <section className="hero">
      <div className="hero-card">
        <p className="eyebrow">Apulia Solutions</p>

        <h1>
          Professional Team Directory & Staff Dashboard
        </h1>

        <p>
          A modern internal SPA for browsing staff members,
          viewing certification status, and accessing
          protected dashboard tools through nested routing.
        </p>

        <div className="hero-actions">
          <Link to="/team" className="btn-primary">
            View Team
          </Link>

          <Link to="/dashboard" className="btn-secondary">
            Open Dashboard
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Team Members</h3>
          <p>{members.length}</p>
        </div>

        <div className="stat-card">
          <h3>Departments</h3>

          <p>
            {
              new Set(
                members.map(
                  (member) => member.department
                )
              ).size
            }
          </p>
        </div>

        <div className="stat-card">
          <h3>Protected Areas</h3>
          <p>3</p>
        </div>
      </div>
    </section>
  );
}