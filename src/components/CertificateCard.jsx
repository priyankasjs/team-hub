import React from "react";
import useCertStatus from "../hooks/useCertStatus";

export default function CertificateCard({ cert }) {
  const { status, color, daysLeft } = useCertStatus(cert.expiry);

  const statusClass =
    color === "green"
      ? "status-badge status-green"
      : color === "orange"
      ? "status-badge status-orange"
      : "status-badge status-red";

  const expiryClass =
    color === "green"
      ? "expiry-green"
      : color === "orange"
      ? "expiry-orange"
      : "expiry-red";

  return (
    <article className="cert-card">
      <div className={`cert-top cert-top-${color}`}></div>

      <div className="cert-image">
        {cert.image_url ? (
          <img
            src={cert.image_url}
            alt={cert.name}
            onError={(e) => {
              e.target.src = "/images/placeholder-cert.jpg";
            }}
          />
        ) : (
          <span>Certificate Image</span>
        )}
      </div>

      <div className="cert-body">
        <h3>{cert.name}</h3>

        <p className="muted">
          Issued by: {cert.issuer}
        </p>

        <p className={expiryClass}>
          Expiry: {cert.expiry}
        </p>

        <div className={statusClass}>
          <span className="status-dot"></span>
          {status}
        </div>

        <p className="days-left">
          {daysLeft < 0
            ? `Expired ${Math.abs(daysLeft)} day(s) ago`
            : `${daysLeft} day(s) left`}
        </p>
      </div>
    </article>
  );
}