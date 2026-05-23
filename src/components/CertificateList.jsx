import React from "react";
import CertificateCard from "./CertificateCard";

export default function CertificateList({ certificates = [] }) {
  return (
    <section className="section-block">
      <h2>Certificates</h2>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
}