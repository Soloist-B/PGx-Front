// src/app/(protected)/consent/page.tsx
"use client";

import { usePatients } from "@/context/PatientContext";
import { useState } from "react";
import styles from "./page.module.css";

export default function ConsentPage() {
  const { patients } = usePatients();
  const [consentMap, setConsentMap] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  // กรองเอาคนไม่ซ้ำ (ตาม idCard)
  const uniquePatients = patients.filter(
    (p, index, self) => index === self.findIndex((x) => x.idCard === p.idCard)
  );

  // filter ตาม search query
  const filtered = uniquePatients.filter(
    (p) =>
      p.idCard.includes(query) ||
      p.firstName.toLowerCase().includes(query.toLowerCase()) ||
      p.lastName.toLowerCase().includes(query.toLowerCase())
  );

  // toggle consent
  const toggleConsent = (idCard: string) => {
    setConsentMap((prev) => ({
      ...prev,
      [idCard]: !prev[idCard],
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Consent Management</h1>
      <p className={styles.subtitle}>Check patient consent status</p>

      {/* Search bar */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by ID Card or Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No patients found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Card</th>
                <th>Name</th>
                <th>Consent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.idCard}>
                  <td>{p.idCard}</td>
                  <td>
                    {p.firstName} {p.lastName}
                  </td>
                  <td>
                    <button
                      className={`${styles.toggleBtn} ${
                        consentMap[p.idCard] ? styles.consented : styles.notConsented
                      }`}
                      onClick={() => toggleConsent(p.idCard)}
                    >
                      {consentMap[p.idCard] ? "Revoke Consent" : "Give Consent"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
