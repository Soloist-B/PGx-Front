"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/context/PatientContext";
import { Search, Download, Activity } from "lucide-react";
import styles from "./page.module.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const { patients } = usePatients();
  const [filter, setFilter] = useState<
    "all" | "pending_gene" | "pending_approve" | "approved"
  >("all");
  const [search, setSearch] = useState("");

  // 🎯 Summary Count
  const summary = useMemo(
    () => ({
      total: patients.length,
      pending_gene: patients.filter((p) => p.status === "pending_gene").length,
      pending_approve: patients.filter(
        (p) => p.status === "pending_approve"
      ).length,
      approved: patients.filter((p) => p.status === "approved").length,
    }),
    [patients]
  );

  // 🧠 Filtered Patient List
  const filteredPatients = useMemo(() => {
    return patients
      .filter(
        (p) =>
          (filter === "all" ? true : p.status === filter) &&
          (p.firstName.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName.toLowerCase().includes(search.toLowerCase()) ||
            p.idCard.includes(search))
      )
      .reverse();
  }, [patients, filter, search]);

  // 🧮 Pie chart data
  const pieData = [
    { name: "Pending Gene", value: summary.pending_gene, color: "#e55353" },
    { name: "Pending Approve", value: summary.pending_approve, color: "#f4b400" },
    { name: "Approved", value: summary.approved, color: "#2b9348" },
  ];

  // 📤 Export CSV
  const exportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "ID",
      "Gene",
      "Genotype",
      "Phenotype",
      "Status",
    ];
    const rows = patients.map((p) => [
      p.firstName,
      p.lastName,
      p.idCard,
      p.gene || "-",
      p.genotype || "-",
      p.phenotype || "-",
      p.status || "-",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PGx_Patient_Report.csv";
    a.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PGx Dashboard</h1>
      <p className={styles.subtitle}>
        Pharmacogenomics data overview and workflow monitoring.
      </p>

      {/* Summary Cards */}
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.total}`}>
          <h3>Total Patients</h3>
          <p className={styles.number}>{summary.total}</p>
        </div>
        <div className={`${styles.card} ${styles.pendingGene}`}>
          <h3>Pending Gene</h3>
          <p className={styles.number}>{summary.pending_gene}</p>
        </div>
        <div className={`${styles.card} ${styles.pendingApprove}`}>
          <h3>Pending Approve</h3>
          <p className={styles.number}>{summary.pending_approve}</p>
        </div>
        <div className={`${styles.card} ${styles.approved}`}>
          <h3>Approved</h3>
          <p className={styles.number}>{summary.approved}</p>
        </div>
      </div>

      {/* Chart + Filter/Search */}
      <div className={styles.topRow}>
        <div className={styles.chartBox}>
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            {["all", "pending_gene", "pending_approve", "approved"].map(
              (status) => (
                <button
                  key={status}
                  className={`${styles.filterBtn} ${
                    filter === status ? styles.activeFilter : ""
                  }`}
                  onClick={() => setFilter(status as any)}
                >
                  {status === "all"
                    ? "All"
                    : status.replace("_", " ").replace("_", " ")}
                </button>
              )
            )}
          </div>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by Name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Gene</th>
              <th>Genotype</th>
              <th>Phenotype</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                  No matching patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map((p) => (
                <tr key={p.idCard}>
                  <td>
                    {p.firstName} {p.lastName}
                  </td>
                  <td>{p.idCard}</td>
                  <td>{p.gene || "-"}</td>
                  <td>{p.genotype || "-"}</td>
                  <td>{p.phenotype || "-"}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        p.status === "pending_gene"
                          ? styles.statusPending
                          : p.status === "pending_approve"
                          ? styles.statusReview
                          : styles.statusApproved
                      }`}
                    >
                      {p.status?.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* System Activity */}
      <div className={styles.activityBox}>
        <h3>
          <Activity size={18} color="#4CA771" style={{ marginRight: 6 }} />
          Recent System Activity
        </h3>
        <ul className={styles.activityList}>
          <li>🧬 Pharmacist Sarah approved HLA-B*15:02 for patient Emily Davis</li>
          <li>📥 System uploaded CYP2C9 report for patient John Smith</li>
          <li>👩‍⚕️ Doctor Michael reviewed patient phenotype data</li>
        </ul>
      </div>
    </div>
  );
}
