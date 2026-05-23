import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TeamMemberCard from "../components/TeamMemberCard";
import { fetchMembers } from "../data/teamService";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await fetchMembers();

        console.log(data);

        setMembers(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    // SHOW ALL MEMBERS if search box empty
    if (!query.trim()) {
      return members;
    }

    return members.filter((member) => {
      const text =
        `${member.name} ${member.role} ${member.department}`.toLowerCase();

      return text.includes(query.toLowerCase());
    });
  }, [members, query]);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return (
      <section className="page-card">
        <h1>Loading team...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-card">
        <h1>Error loading members</h1>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <div className="page-card">
        <h1>Team Directory</h1>

        <input
          type="text"
          className="search-input"
          placeholder="Search team members..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="member-grid">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
            />
          ))
        ) : (
          <div className="page-card">
            <h2>No matching team members found.</h2>
          </div>
        )}
      </div>
    </section>
  );
}