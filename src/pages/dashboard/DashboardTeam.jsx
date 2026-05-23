import { useEffect, useState } from "react";
import { addMember, fetchMembers } from "../../data/teamService";

export default function DashboardTeam() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    bio: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  async function loadMembers() {
    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addMember(formData);

      setFormData({
        name: "",
        role: "",
        department: "",
        bio: "",
        image: "",
      });

      await loadMembers();

      alert("Member added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h1>Dashboard Team Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="search-input"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="search-input"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="search-input"
          required
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="search-input"
          rows="4"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="/images/member5.jpg"
          value={formData.image}
          onChange={handleChange}
          className="search-input"
          required
        />

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Adding Member..." : "Add Member"}
        </button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <h2>Current Members</h2>

        <ul className="dashboard-list">
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.name}</strong> — {member.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}