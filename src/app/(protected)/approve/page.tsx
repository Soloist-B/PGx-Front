"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/context/PatientContext";
import { Search, CheckCircle, XCircle, ClipboardCheck } from "lucide-react";
import styles from "./page.module.css";

export default function ApprovePage() {
  const { patients, updatePatients } = usePatients();
  const [searchId, setSearchId] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // filter patients waiting for approval
  const pendingApprovals = useMemo(() => {
    return patients.filter(
      (p) =>
        p.status === "pending_approve" &&
        p.idCard.includes(searchId.trim())
    );
  }, [patients, searchId]);

  const handleSelectPatient = (id: string) => {
    if (selectedId === id) setSelectedId(null);
    else setSelectedId(id);
  };

  const handleApprove = (id: string) => {
    const updated = patients.map((p) =>
      p.idCard === id ? { ...p, status: "approved" as const } : p
    );
    updatePatients(updated);
    alert("✅ Patient approved successfully!");
    setSelectedId(null);
  };

  const handleReject = (id: string) => {
    const updated = patients.map((p) =>
      p.idCard === id ? { ...p, status: "pending_gene" as const } : p
    );
    updatePatients(updated);
    alert("❌ Sent back for correction.");
    setSelectedId(null);
  };

  const selectedPatient = pendingApprovals.find((p) => p.idCard === selectedId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Approval Management</h1>
      <p className={styles.subtitle}>
        Review and approve patients’ pharmacogenomic results.
      </p>

      <div className={styles.grid}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.chartBox}>
            <h3>
              <ClipboardCheck size={18} color="#4CA771" style={{ marginRight: 6 }} />
              Pending Approvals
            </h3>
            <p className={styles.sectionNote}>
              Select a patient to review and approve genetic data.
            </p>

            {/* Search bar */}
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search by ID Card (13 digits)"
                className={styles.searchInput}
                value={searchId}
                onChange={(e) =>
                  setSearchId(e.target.value.replace(/\D/g, "").slice(0, 13))
                }
              />
              <button className={styles.searchButton}>
                <Search size={18} />
              </button>
            </div>

            {pendingApprovals.length === 0 ? (
              <p>No pending approvals found.</p>
            ) : (
              <div className={styles.scrollBox}>
                {pendingApprovals.map((p) => (
                  <div
                    key={p.idCard}
                    className={`${styles.patientCard} ${
                      selectedId === p.idCard ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectPatient(p.idCard)}
                  >
                    <div className={styles.patientName}>
                      {p.firstName} {p.lastName}
                    </div>
                    <div className={styles.patientInfo}>
                      <span>ID: {p.idCard}</span>
                      <span className={`${styles.statusBadge}`}>Pending_approve</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          {selectedPatient ? (
            <div className={styles.detailBox}>
              <h3>Patient Details</h3>
              <p className={styles.sectionNote}>
                Review genetic and personal information before approval.
              </p>

              <div className={styles.infoGrid}>
                <p><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
                <p><strong>ID:</strong> {selectedPatient.idCard}</p>
                <p><strong>Sex:</strong> {selectedPatient.sex}</p>
                <p><strong>DOB:</strong> {selectedPatient.dob}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                <p><strong>Ethnicity:</strong> {selectedPatient.ethnicity}</p>
              </div>

              <div className={styles.geneSection}>
                <h4>Genetic Information</h4>
                <p><strong>Gene:</strong> {selectedPatient.gene}</p>
                <p><strong>Genotype:</strong> {selectedPatient.genotype}</p>
                <p><strong>Phenotype:</strong> {selectedPatient.phenotype}</p>
                <p><strong>Recommendation:</strong> {selectedPatient.recommendation}</p>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() => handleApprove(selectedPatient.idCard)}
                  className={`${styles.button} ${styles.approveBtn}`}
                >
                  <CheckCircle size={18} style={{ marginRight: 6 }} /> Approve
                </button>
                <button
                  onClick={() => handleReject(selectedPatient.idCard)}
                  className={`${styles.button} ${styles.rejectBtn}`}
                >
                  <XCircle size={18} style={{ marginRight: 6 }} /> Send Back
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.emptyBox}>
              <p>Select a patient to view their details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
