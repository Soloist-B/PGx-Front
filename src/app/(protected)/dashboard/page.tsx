"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FlaskConical, Clock, CheckCircle2, Activity } from "lucide-react";

export default function DashboardPage() {
  const [newUploads, setNewUploads] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // 🔹 Simulated hospital database records
    const mockData = [
      { id: "PGX001", gene: "CYP2C9", patient: "John Smith", status: "new", date: "2025-10-14" },
      { id: "PGX002", gene: "CYP2D6", patient: "Michael Lee", status: "pending", date: "2025-10-13" },
      { id: "PGX003", gene: "HLA-B*15:02", patient: "Sarah Chen", status: "approved", date: "2025-10-12" },
      { id: "PGX004", gene: "SLCO1B1", patient: "Emily Davis", status: "approved", date: "2025-10-11" },
    ];

    setNewUploads(mockData.filter((x) => x.status === "new"));
    setPending(mockData.filter((x) => x.status === "pending"));
    setApproved(mockData.filter((x) => x.status === "approved"));

    // 🔹 Example of recent actions in system log
    const mockLogs = [
      {
        time: "09:15 - 2025/10/14",
        action: "System uploaded new PGx report CYP2C9 for patient John Smith",
      },
      {
        time: "11:30 - 2025/10/14",
        action: "Pharmacist Sarah reviewed CYP2D6 report for patient Michael Lee",
      },
      {
        time: "14:00 - 2025/10/14",
        action: "Pharmacist Sarah approved HLA-B*15:02 report for Sarah Chen",
      },
    ];

    setLogs(mockLogs);

    // ✅ Console log (developer view)
    console.log("📊 PGx Dashboard Data:", mockData);
    console.table(mockLogs);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Pharmacogenomics data overview from hospital database</p>

      <div className={styles.grid}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          {/* New Uploads */}
          <div className={styles.chartBox}>
            <h3>
              <FlaskConical size={18} color="#4CA771" style={{ marginRight: 6 }} />
              New Genetic Reports
            </h3>
            {newUploads.length > 0 ? (
              <ul className={styles.activityList}>
                {newUploads.map((item) => (
                  <li key={item.id} className={styles.activityItem}>
                    <div className={styles.timelineDot}></div>
                    <div>
                      <span className={styles.time}>{item.date}</span>
                      <span className={styles.detail}>
                        {item.patient} — {item.gene}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new reports at the moment.</p>
            )}
          </div>

          {/* Pending Review */}
          <div className={styles.chartBox}>
            <h3>
              <Clock size={18} color="#4CA771" style={{ marginRight: 6 }} />
              Pending Pharmacist Review
            </h3>
            {pending.length > 0 ? (
              <ul className={styles.activityList}>
                {pending.map((item) => (
                  <li key={item.id} className={styles.activityItem}>
                    <div className={styles.timelineDot}></div>
                    <div>
                      <span className={styles.time}>{item.date}</span>
                      <span className={styles.detail}>
                        {item.patient} — {item.gene}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>All samples have been reviewed.</p>
            )}
          </div>

          {/* Approved */}
          <div className={styles.chartBox}>
            <h3>
              <CheckCircle2 size={18} color="#4CA771" style={{ marginRight: 6 }} />
              Approved by Pharmacist
            </h3>
            {approved.length > 0 ? (
              <ul className={styles.activityList}>
                {approved.map((item) => (
                  <li key={item.id} className={styles.activityItem}>
                    <div className={styles.timelineDot}></div>
                    <div>
                      <span className={styles.time}>{item.date}</span>
                      <span className={styles.detail}>
                        {item.patient} — {item.gene}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approved reports yet.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.activity}>
            <h3>
              <Activity size={18} color="#4CA771" style={{ marginRight: 6 }} />
              System Activity Log
            </h3>
            {logs.length > 0 ? (
              <ul className={styles.activityList}>
                {logs.map((log, index) => (
                  <li key={index} className={styles.activityItem}>
                    <div className={styles.timelineDot}></div>
                    <div>
                      <span className={styles.time}>{log.time}</span>
                      <span className={styles.detail}>{log.action}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activity logs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
