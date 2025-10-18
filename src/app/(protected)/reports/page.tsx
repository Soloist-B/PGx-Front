// src/app/(protected)/reports/page.tsx
"use client";

import { useState } from "react";
import { usePatients } from "@/context/PatientContext";
import type { Patient } from "@/context/PatientContext";
import styles from "./page.module.css";

// ฟังก์ชันคำนวณอายุ
const calculateAge = (dob: string) => {
  if (!dob) return "-";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function ReportsPage() {
  const { patients } = usePatients();
  const [query, setQuery] = useState("");

  // filter ตามชื่อหรือตามเลขบัตร
  const filtered = patients.filter(
    (p) =>
      p.idCard.includes(query) ||
      p.firstName.toLowerCase().includes(query.toLowerCase()) ||
      p.lastName.toLowerCase().includes(query.toLowerCase())
  );

  // export รายบุคคล
  const handleExport = (patient: Patient) => {
    const printable = `
Patient Report
-----------------------------
ID Card: ${patient.idCard}
Name: ${patient.firstName} ${patient.lastName}
Sex: ${patient.sex}
DOB: ${patient.dob}
Age: ${calculateAge(patient.dob)}
Phone: ${patient.phone}
Ethnicity: ${patient.ethnicity === "other" ? patient.otherEthnicity : "Thai"}
Gene: ${patient.gene}
    `;
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`<pre>${printable}</pre>`);
      newWindow.document.close();
      newWindow.print();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patient Reports</h1>
      <p className={styles.subtitle}>Summary of patient records</p>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by ID Card or Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                <th>Sex</th>
                <th>DOB</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Ethnicity</th>
                <th>Gene</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i}>
                  <td>{p.idCard}</td>
                  <td>
                    {p.firstName} {p.lastName}
                  </td>
                  <td>{p.sex}</td>
                  <td>{p.dob}</td>
                  <td>{calculateAge(p.dob)}</td>
                  <td>{p.phone}</td>
                  <td>{p.ethnicity === "other" ? p.otherEthnicity : "Thai"}</td>
                  <td>{p.gene}</td>
                  <td>
                    <button
                      className={styles.exportButton}
                      onClick={() => handleExport(p)}
                    >
                      Export
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
