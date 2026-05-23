import { useEffect, useState } from "react";
import { fetchMembers } from "../../data/teamService";

export default function DashboardOverview() {
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
    <section className="dashboard-grid">
      <div className="stat-card">
        <h3>Total Team Members</h3>
        <p>{members.length}</p>
      </div>

      <div className="stat-card">
        <h3>Departments</h3>
        <p>
          {
            new Set(
              members.map((member) => member.department)
            ).size
          }
        </p>
      </div>

      <div className="stat-card">
        <h3>Protected Areas</h3>
        <p>3</p>
      </div>
    </section>
  );
}