import React from "react";
import { Link } from "react-router-dom";

export default function TeamMemberCard({ member }) {
  return (
    <article className="member-card">
      <img
        src={member.image || "/images/placeholder-person.jpg"}
        alt={member.name}
        className="member-img"
      />

      <h3>{member.name}</h3>

      <p className="muted">
        {member.role} • {member.department}
      </p>

      <p>{member.bio}</p>

      <Link
        to={`/team/${member.id}`}
        className="btn-link"
      >
        View Profile
      </Link>
    </article>
  );
}