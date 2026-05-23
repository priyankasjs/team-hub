import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CertificateList from "../components/CertificateList";
import { fetchMemberById } from "../data/teamService";

export default function MemberProfile() {
  const { memberId } = useParams();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMember() {
      try {
        const data = await fetchMemberById(memberId);
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, [memberId]);

  const certSummary = useMemo(() => {
    if (!member?.certificates) return null;

    const summary = {
      valid: 0,
      expiring: 0,
      expired: 0,
    };

    member.certificates.forEach((cert) => {
      const today = new Date();
      const expiryDate = new Date(cert.expiry);

      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      const daysLeft = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft < 0) summary.expired++;
      else if (daysLeft <= 30) summary.expiring++;
      else summary.valid++;
    });

    return summary;
  }, [member]);

  if (loading) {
    return (
      <section className="page-card">
        <h1>Loading member...</h1>
      </section>
    );
  }

  if (error || !member) {
    return (
      <section className="page-card">
        <h1>Member not found</h1>

        <Link to="/team" className="btn-link">
          Back to Team
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="profile-card">
        <div className="profile-main">
          <img
            src={member.image}
            alt={member.name}
            className="profile-image"
          />

          <div className="profile-info">
            <p className="eyebrow">Member Profile</p>

            <h1>{member.name}</h1>

            <p className="muted">
              {member.role} • {member.department}
            </p>

            <p>{member.bio}</p>
          </div>
        </div>

        <div className="summary-box">
          <h3>Certificate Summary</h3>

          <p>Valid: {certSummary?.valid}</p>
          <p>Expiring: {certSummary?.expiring}</p>
          <p>Expired: {certSummary?.expired}</p>
        </div>
      </div>

      <CertificateList certificates={member.certificates} />
    </section>
  );
}