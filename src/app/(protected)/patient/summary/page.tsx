// src/app/(protected)/patient/summary/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePatients } from "@/context/PatientContext";
import styles from "./page.module.css";

export default function SummaryPage() {
  const router = useRouter();
  const { patients } = usePatients();

  // ดึง record ล่าสุดมาสรุป
  const patient = patients[patients.length - 1];

  useEffect(() => {
    if (!patient) router.replace("/patient");
  }, [patient, router]);

  if (!patient) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patient Summary</h1>
      <p className={styles.subtitle}>Review before printing or exporting</p>

      {/* Patient Information */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Patient Information</h2>
        <div className={styles.grid}>
          <div><b>ID Card:</b> {patient.idCard}</div>
          <div><b>Name:</b> {patient.firstName} {patient.lastName}</div>
          <div><b>Sex:</b> {patient.sex}</div>
          <div><b>DOB:</b> {patient.dob}</div>
          <div><b>Phone:</b> {patient.phone}</div>
          <div>
            <b>Nationality:</b>{" "}
            {patient.ethnicity === "other"
              ? patient.otherEthnicity
              : "Thai"}
          </div>
        </div>
      </div>

      {/* Genetic Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Genetic Summary</h2>
        <div className={styles.grid}>
          <div><b>Gene:</b> {patient.gene}</div>
          <div><b>Genotype (predicted):</b> {patient.genotype || "-"}</div>
          <div><b>Phenotype (predicted):</b> {patient.phenotype || "-"}</div>
        </div>

        <div className={styles.markerBlock}>
          <b>Markers:</b>
          <ul>
            {Object.entries(patient.markerValues || {}).map(([k, v]) => (
              <li key={k}>{k}: {v}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => window.print()}
        >
          Export
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => router.push("/patient")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
